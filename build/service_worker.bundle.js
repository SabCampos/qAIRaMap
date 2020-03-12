/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/service_worker.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/service_worker.js":
/*!*******************************!*\
  !*** ./src/service_worker.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const cacheName = 'v2';\n\n//Call Install Event\nself.addEventListener('install', e => {\n    console.log('Service Worker: Installed');\n    \n});\n\n//Call Activate Event\nself.addEventListener('activate', e => {\n    console.log('Service Worker: Activated');\n\n    e.waitUntil(\n        caches.keys().then(cacheNames=> {\n            return Promise.all(\n                cacheNames.map(cache =>{\n                    if (cache !== cacheName) {\n                        console.log('Service Worker: Clearing Old Cache');\n                        return caches.delete(cache);\n                    }\n                })\n            )\n        }\n\n        )\n    )\n    \n})\n\n// Call Fetch Event\nself.addEventListener('fetch', e=>{\n    console.log('Service Worker: Fetching');\n    e.respondWith(\n        fetch(e.request)\n        .then(res => {\n            //Clone response\n            const resClone = res.clone();\n            //Open cache\n            caches\n            .open(cacheName)\n            .then(cache =>{\n                // Add response to cache\n                cache.put(e.request, resClone);\n            });\n            return res;\n        }).catch(er => caches.match(e.request)).then(res => res)\n    )\n    \n})//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2VydmljZV93b3JrZXIuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZV93b3JrZXIuanM/OGRhMCJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBjYWNoZU5hbWUgPSAndjInO1xuXG4vL0NhbGwgSW5zdGFsbCBFdmVudFxuc2VsZi5hZGRFdmVudExpc3RlbmVyKCdpbnN0YWxsJywgZSA9PiB7XG4gICAgY29uc29sZS5sb2coJ1NlcnZpY2UgV29ya2VyOiBJbnN0YWxsZWQnKTtcbiAgICBcbn0pO1xuXG4vL0NhbGwgQWN0aXZhdGUgRXZlbnRcbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcignYWN0aXZhdGUnLCBlID0+IHtcbiAgICBjb25zb2xlLmxvZygnU2VydmljZSBXb3JrZXI6IEFjdGl2YXRlZCcpO1xuXG4gICAgZS53YWl0VW50aWwoXG4gICAgICAgIGNhY2hlcy5rZXlzKCkudGhlbihjYWNoZU5hbWVzPT4ge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFxuICAgICAgICAgICAgICAgIGNhY2hlTmFtZXMubWFwKGNhY2hlID0+e1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2FjaGUgIT09IGNhY2hlTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1NlcnZpY2UgV29ya2VyOiBDbGVhcmluZyBPbGQgQ2FjaGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWNoZXMuZGVsZXRlKGNhY2hlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICApXG4gICAgKVxuICAgIFxufSlcblxuLy8gQ2FsbCBGZXRjaCBFdmVudFxuc2VsZi5hZGRFdmVudExpc3RlbmVyKCdmZXRjaCcsIGU9PntcbiAgICBjb25zb2xlLmxvZygnU2VydmljZSBXb3JrZXI6IEZldGNoaW5nJyk7XG4gICAgZS5yZXNwb25kV2l0aChcbiAgICAgICAgZmV0Y2goZS5yZXF1ZXN0KVxuICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgLy9DbG9uZSByZXNwb25zZVxuICAgICAgICAgICAgY29uc3QgcmVzQ2xvbmUgPSByZXMuY2xvbmUoKTtcbiAgICAgICAgICAgIC8vT3BlbiBjYWNoZVxuICAgICAgICAgICAgY2FjaGVzXG4gICAgICAgICAgICAub3BlbihjYWNoZU5hbWUpXG4gICAgICAgICAgICAudGhlbihjYWNoZSA9PntcbiAgICAgICAgICAgICAgICAvLyBBZGQgcmVzcG9uc2UgdG8gY2FjaGVcbiAgICAgICAgICAgICAgICBjYWNoZS5wdXQoZS5yZXF1ZXN0LCByZXNDbG9uZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH0pLmNhdGNoKGVyID0+IGNhY2hlcy5tYXRjaChlLnJlcXVlc3QpKS50aGVuKHJlcyA9PiByZXMpXG4gICAgKVxuICAgIFxufSkiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/service_worker.js\n");

/***/ })

/******/ });