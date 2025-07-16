<?php

namespace App\Http\Controllers;

use Illuminate\Support\Arr;
use Illuminate\Database\Eloquent\Builder;
use Exception;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class DefaultController extends Controller
{
    /**
     * @var string
     */
    protected string $_alias = '';

    /**
     * @var string
     */
    protected string $_model;

    /**
     * @var string
     */
    protected string $_resource;

    /**
     * @var string[]
     */
    protected array $_searchFields = ['name'];

    /**
     * @throws Exception
     */
    public function __construct()
    {
        // Get Alias from controller name
        $className = get_called_class();
        $controllerClassName = Arr::last(explode('\\', $className));
        $name = str($controllerClassName)->replace('Controller', '');
        if (empty($this->_alias)) {
            $this->_alias = str($name)->slug();
        }
        // Set Model Name use Str::studly
        if (empty($this->_model)) {
            $modelClass = 'App\\Models\\' . Str::studly($this->_alias);
            if (!class_exists($modelClass)) {
                throw new Exception("Model Class not Found.");
            }
            $this->_model = $modelClass;
        }
        // Set Resource use Str::studly
        if (empty($this->_resource)) {
            $fileName = Str::studly($this->_alias) . 'Resource';
            if (file_exists(__DIR__. '/../Resources/' . $fileName . '.php')) {
                $resourceClass = 'App\\Http\\Resources\\' . Str::studly($this->_alias) . 'Resource';
            } else {
                $resourceClass = 'App\\Http\\Resources\\DefaultResource';
            }

            $this->_resource = $resourceClass;
        }
    }

    public function index(): Response
    {
        $keyword = request()->query('keyword', '');
        $perPage = request()->query('per_page', 20);
        $sortField = request()->query('sort_field', '');
        $sortValue = request()->query('sort_value', 'asc');

        $items = call_user_func([$this->_model, 'query']);
        if (!empty($sortField)) $items->orderBy($sortField, $sortValue);
        if (!empty($keyword)) {
            $searchFields = $this->_searchFields;
            $items->where(function (Builder $q) use ($searchFields, $keyword) {
                foreach ($searchFields as $field) {
                    $q->orWhere($field, 'like', '%'. $keyword.'%');
                }
            });
        }
        [$items, $filters] = $this->_extendIndexQuery($items);
        return Inertia::render('admin/'.$this->_alias.'/index', [
            'items' => call_user_func([$this->_resource, 'collection'], $items->paginate($perPage)),
            'params' => array_merge([
                'page' => request()->query('page'),
                'per_page' => $perPage,
                'sort_field' => $sortField,
                'sort_value' => $sortValue,
                'keyword' => $keyword,
            ], $filters)
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/'.$this->_alias.'/create');
    }

    public function edit(): Response
    {
        $itemId = request()->{$this->_alias};
        $item = call_user_func([$this->_model, 'find'], $itemId);
        
        if (empty($item)) {
            abort(404);
        }
        
        return Inertia::render('admin/'.$this->_alias.'/edit', [
            'user' => $item,
        ]);
    }

    public function show(): Response
    {
        $itemId = request()->{$this->_alias};
        $item = call_user_func([$this->_model, 'find'], $itemId);
        return Inertia::render('admin/'.$this->_alias.'/form', [
            'item' => $item,
        ]);
    }

    public function store()
    {
        try {
            // Log raw request data
            \Log::info('Raw request data:', request()->all());
            
            $data = $this->_getDataCreate();
            
            // Log data for debugging
            \Log::info('Creating user with data:', $data);
            
            $item = call_user_func([$this->_model, 'create'], $data);
            $this->_afterSave($item);
            
            // Convert singular to plural for route name
            $routeName = 'admin.' . Str::plural($this->_alias) . '.index';
            return redirect()->route($routeName);
        } catch (\Exception $e) {
            \Log::error('Error creating user: ' . $e->getMessage());
            \Log::error('Stack trace: ' . $e->getTraceAsString());
            
            // Return error response
            return back()->withErrors(['error' => 'Failed to create user: ' . $e->getMessage()]);
        }
    }

    public function update()
    {
        $itemId = request()->{$this->_alias};
        $item = call_user_func([$this->_model, 'find'], $itemId);
        if (empty($item)) {
            return response([
                'status' => 'FAIL',
                'message' => 'Not Found'
            ], 404);
        }

        $data = $this->_getDataUpdate($item);
        $item->update($data);
        $this->_afterSave($item, 'update');
        
        // Convert singular to plural for route name
        $routeName = 'admin.' . Str::plural($this->_alias) . '.index';
        return redirect()->route($routeName);
    }

    /**
     * @throws Exception
     */
    public function destroy()
    {
        try {
            $itemId = request()->{$this->_alias};
            $item = call_user_func([$this->_model, 'find'], $itemId);
            
            if (empty($item)) {
                abort(404);
            }
            
            // Call before delete hook
            $this->_beforeDelete($item);
            
            // Get item name for success message
            $itemName = $item->name ?? 'Item';
            
            $item->delete();

            // Convert singular to plural for route name
            $routeName = 'admin.' . Str::plural($this->_alias) . '.index';
            return redirect()->route($routeName)->with('success', ucfirst($this->_alias) . ' "' . $itemName . '" deleted successfully');
        } catch (\Exception $e) {
            \Log::error('Error deleting item: ' . $e->getMessage());
            return back()->withErrors(['error' => 'Failed to delete item: ' . $e->getMessage()]);
        }
    }

    protected function _getDataUpdate($item): array
    {
        return $this->_beforeSave($this->_validate($item, 'update'), 'update');
    }

    protected function _getDataCreate(): array
    {
        $model = $this->_model;
        $validatedData = $this->_validate(new $model);
        return $this->_beforeSave($validatedData, 'store');
    }

    protected function _validate($model, $action = 'store'): array
    {
        $validatedData = request()->validate($this->_validateRule($model, $action));
        \Log::info('Validated data:', $validatedData);
        return $validatedData;
    }

    protected function _afterSave($item, $action = 'store')
    {

    }

    protected function _beforeDelete($item)
    {
        // Override in child classes if needed
    }

    protected function _beforeSave($data, $action = 'store')
    {
        return $data;
    }

    protected function _validateRule($model, $action = 'store'): array
    {
        return [];
    }

    protected function _extendIndexQuery(Builder $query): array
    {
        return [$query, []];
    }
}
