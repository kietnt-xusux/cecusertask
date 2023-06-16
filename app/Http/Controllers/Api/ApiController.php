<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class ApiController extends Controller
{
    /**
     * @var string
     */
    protected $_alias = '';

    /**
     * @var string
     */
    protected $_model;

    /**
     * @var string
     */
    protected $_resource;

    /**
     * @var string[]
     */
    protected $_searchFields = ['name'];

    /**
     * @param string $model
     */
    public function setModel(string $model): void
    {
        $this->_model = $model;
    }

    /**
     * @param string $resource
     */
    public function setResource(string $resource): void
    {
        $this->_resource = $resource;
    }

    /**
     * @param string[] $searchFields
     */
    public function setSearchFields(array $searchFields): void
    {
        $this->_searchFields = $searchFields;
    }

    /**
     * @param string $alias
     */
    public function setAlias(string $alias): void
    {
        $this->_alias = $alias;
    }

    /**
     * @throws Exception
     */
    public function __construct()
    {
        // Get Alias from controller name
        $className = get_called_class();
        $controllerClassName = Arr::last(explode('\\', $className));
        if (empty($this->_alias)) {
            $this->_alias = Str::snake(str_replace('Controller', '', $controllerClassName));
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
            if (file_exists(__DIR__. '/../../Resources/' . $fileName . '.php')) {
                $resourceClass = 'App\\Http\\Resources\\' . Str::studly($this->_alias) . 'Resource';
            } else {
                $resourceClass = 'App\\Http\\Resources\\DefaultResource';
            }

            $this->_resource = $resourceClass;
        }
    }

    public function index()
    {
        $condition = request()->query('search_text', '');
        $perPage = request()->query('per_page', 10);
        $sortField = request()->query('sort_field', '');
        $sortValue = request()->query('sort_value', 'asc');

        $query = call_user_func([$this->_model, 'query']);
        if (!empty($sortField)) $query->orderBy($sortField, $sortValue);
        if (!empty($condition)) {
            $searchFields = $this->_searchFields;
            $query->where(function ($q) use($searchFields, $condition) {
                foreach ($searchFields as $searchField) {
                    $q->orWhere($searchField, 'LIKE', '%'.$condition.'%');
                }
            });
        }

        $query = $this->_extendIndexQuery($query);

        return call_user_func([$this->_resource, 'collection'], $query->paginate($perPage));
    }

    public function show()
    {
        $itemId = request()->{$this->_alias};
        $item = call_user_func([$this->_model, 'find'], $itemId);
        return new $this->_resource($item);
    }

    public function store()
    {
        $data = $this->_getDataCreate();
        $item = call_user_func([$this->_model, 'create'], $data);
        $this->_afterSave($item);
        $resourceName = $this->_resource;
        return new $resourceName($item);
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
        $resourceName = $this->_resource;
        return new $resourceName($item);
    }

    /**
     * @throws Exception
     */
    public function destroy()
    {
        $itemId = request()->{$this->_alias};
        $item = call_user_func([$this->_model, 'find'], $itemId);
        if (empty($item)) {
            return response([
                'status' => 'FAIL',
                'message' => 'Not Found'
            ], 404);
        }
        $item->delete();

        return response([
            'status' => 'OK',
            'message' => 'Delete complete'
        ], 200);
    }

    public function responseFail(): JsonResponse
    {
        return response()->json([
            'status' => 'Fail',
            'message' => 'Fail'
        ], 500);
    }

    public function responseNotFound(): JsonResponse
    {
        return response()->json([
            'status' => 'Fail',
            'message' => 'Not found'
        ], 404);
    }

    protected function _getDataUpdate($item): array
    {
        return $this->_beforeSave($this->_validate($item, 'update'), 'update');
    }

    protected function _getDataCreate(): array
    {
        $model = $this->_model;
        return $this->_beforeSave($this->_validate(new $model));
    }

    protected function _validate($model, $action = 'store'): array
    {
        return request()->validate($this->_validateRule($model, $action));
    }

    protected function _afterSave($item, $action = 'store')
    {

    }

    protected function _beforeSave($data, $action = 'store')
    {
        return $data;
    }

    protected function _validateRule($model, $action = 'store'): array
    {
        return [];
    }

    protected function _extendIndexQuery(Builder $query): Builder
    {
        return $query;
    }
}
