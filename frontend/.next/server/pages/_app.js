/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @chakra-ui/react */ \"@chakra-ui/react\");\n/* harmony import */ var wagmi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! wagmi */ \"wagmi\");\n/* harmony import */ var wagmi_chains__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! wagmi/chains */ \"wagmi/chains\");\n/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @tanstack/react-query */ \"@tanstack/react-query\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _styles_theme__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../styles/theme */ \"./styles/theme.ts\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__, wagmi__WEBPACK_IMPORTED_MODULE_4__, wagmi_chains__WEBPACK_IMPORTED_MODULE_5__, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_6__, _styles_theme__WEBPACK_IMPORTED_MODULE_8__]);\n([_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__, wagmi__WEBPACK_IMPORTED_MODULE_4__, wagmi_chains__WEBPACK_IMPORTED_MODULE_5__, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_6__, _styles_theme__WEBPACK_IMPORTED_MODULE_8__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\n\n\n\n\n\n\nconst config = (0,wagmi__WEBPACK_IMPORTED_MODULE_4__.createConfig)({\n    chains: [\n        wagmi_chains__WEBPACK_IMPORTED_MODULE_5__.mainnet,\n        wagmi_chains__WEBPACK_IMPORTED_MODULE_5__.sepolia\n    ],\n    transports: {\n        [wagmi_chains__WEBPACK_IMPORTED_MODULE_5__.mainnet.id]: (0,wagmi__WEBPACK_IMPORTED_MODULE_4__.http)(),\n        [wagmi_chains__WEBPACK_IMPORTED_MODULE_5__.sepolia.id]: (0,wagmi__WEBPACK_IMPORTED_MODULE_4__.http)()\n    }\n});\nconst queryClient = new _tanstack_react_query__WEBPACK_IMPORTED_MODULE_6__.QueryClient();\nfunction MyApp({ Component, pageProps }) {\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_7__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        // Handle route changes\n        const handleRouteChange = (url)=>{\n            console.log(\"Route changing to:\", url);\n        };\n        const handleRouteChangeComplete = (url)=>{\n            console.log(\"Route change completed:\", url);\n        };\n        const handleRouteChangeError = (err, url)=>{\n            console.error(\"Route change error:\", {\n                url,\n                err\n            });\n        };\n        router.events.on(\"routeChangeStart\", handleRouteChange);\n        router.events.on(\"routeChangeComplete\", handleRouteChangeComplete);\n        router.events.on(\"routeChangeError\", handleRouteChangeError);\n        return ()=>{\n            router.events.off(\"routeChangeStart\", handleRouteChange);\n            router.events.off(\"routeChangeComplete\", handleRouteChangeComplete);\n            router.events.off(\"routeChangeError\", handleRouteChangeError);\n        };\n    }, [\n        router\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_tanstack_react_query__WEBPACK_IMPORTED_MODULE_6__.QueryClientProvider, {\n        client: queryClient,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(wagmi__WEBPACK_IMPORTED_MODULE_4__.WagmiProvider, {\n            config: config,\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.ChakraProvider, {\n                theme: _styles_theme__WEBPACK_IMPORTED_MODULE_8__[\"default\"],\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                    ...pageProps\n                }, void 0, false, {\n                    fileName: \"H:\\\\projects\\\\education\\\\frontend\\\\pages\\\\_app.tsx\",\n                    lineNumber: 55,\n                    columnNumber: 11\n                }, this)\n            }, void 0, false, {\n                fileName: \"H:\\\\projects\\\\education\\\\frontend\\\\pages\\\\_app.tsx\",\n                lineNumber: 54,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"H:\\\\projects\\\\education\\\\frontend\\\\pages\\\\_app.tsx\",\n            lineNumber: 53,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"H:\\\\projects\\\\education\\\\frontend\\\\pages\\\\_app.tsx\",\n        lineNumber: 52,\n        columnNumber: 5\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBeUI7QUFDSztBQUVtQjtBQUNQO0FBQ0s7QUFDeUI7QUFDbkM7QUFDRTtBQUNOO0FBQ0U7QUFFbkMsTUFBTVksU0FBU1YsbURBQVlBLENBQUM7SUFDMUJXLFFBQVE7UUFBQ1QsaURBQU9BO1FBQUVDLGlEQUFPQTtLQUFDO0lBQzFCUyxZQUFZO1FBQ1YsQ0FBQ1YsaURBQU9BLENBQUNXLEVBQUUsQ0FBQyxFQUFFWiwyQ0FBSUE7UUFDbEIsQ0FBQ0UsaURBQU9BLENBQUNVLEVBQUUsQ0FBQyxFQUFFWiwyQ0FBSUE7SUFDcEI7QUFDRjtBQUVBLE1BQU1hLGNBQWMsSUFBSVYsOERBQVdBO0FBRW5DLFNBQVNXLE1BQU0sRUFBRUMsU0FBUyxFQUFFQyxTQUFTLEVBQVk7SUFDL0MsTUFBTUMsU0FBU1gsc0RBQVNBO0lBRXhCQyxnREFBU0EsQ0FBQztRQUNSLHVCQUF1QjtRQUN2QixNQUFNVyxvQkFBb0IsQ0FBQ0M7WUFDekJDLFFBQVFDLEdBQUcsQ0FBQyxzQkFBc0JGO1FBQ3BDO1FBRUEsTUFBTUcsNEJBQTRCLENBQUNIO1lBQ2pDQyxRQUFRQyxHQUFHLENBQUMsMkJBQTJCRjtRQUN6QztRQUVBLE1BQU1JLHlCQUF5QixDQUFDQyxLQUFVTDtZQUN4Q0MsUUFBUUssS0FBSyxDQUFDLHVCQUF1QjtnQkFBRU47Z0JBQUtLO1lBQUk7UUFDbEQ7UUFFQVAsT0FBT1MsTUFBTSxDQUFDQyxFQUFFLENBQUMsb0JBQW9CVDtRQUNyQ0QsT0FBT1MsTUFBTSxDQUFDQyxFQUFFLENBQUMsdUJBQXVCTDtRQUN4Q0wsT0FBT1MsTUFBTSxDQUFDQyxFQUFFLENBQUMsb0JBQW9CSjtRQUVyQyxPQUFPO1lBQ0xOLE9BQU9TLE1BQU0sQ0FBQ0UsR0FBRyxDQUFDLG9CQUFvQlY7WUFDdENELE9BQU9TLE1BQU0sQ0FBQ0UsR0FBRyxDQUFDLHVCQUF1Qk47WUFDekNMLE9BQU9TLE1BQU0sQ0FBQ0UsR0FBRyxDQUFDLG9CQUFvQkw7UUFDeEM7SUFDRixHQUFHO1FBQUNOO0tBQU87SUFFWCxxQkFDRSw4REFBQ2Isc0VBQW1CQTtRQUFDeUIsUUFBUWhCO2tCQUMzQiw0RUFBQ1IsZ0RBQWFBO1lBQUNJLFFBQVFBO3NCQUNyQiw0RUFBQ1gsNERBQWNBO2dCQUFDVSxPQUFPQSxxREFBS0E7MEJBQzFCLDRFQUFDTztvQkFBVyxHQUFHQyxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLbEM7QUFFQSxpRUFBZUYsS0FBS0EsRUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL2VkdWNhdGlvbi1kYXBwLWZyb250ZW5kLy4vcGFnZXMvX2FwcC50c3g/MmZiZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgJy4uL3N0eWxlcy9nbG9iYWxzLmNzcydcbmltcG9ydCB0eXBlIHsgQXBwUHJvcHMgfSBmcm9tICduZXh0L2FwcCdcbmltcG9ydCB7IENoYWtyYVByb3ZpZGVyIH0gZnJvbSAnQGNoYWtyYS11aS9yZWFjdCdcbmltcG9ydCB7IGNyZWF0ZUNvbmZpZywgaHR0cCB9IGZyb20gJ3dhZ21pJ1xuaW1wb3J0IHsgbWFpbm5ldCwgc2Vwb2xpYSB9IGZyb20gJ3dhZ21pL2NoYWlucydcbmltcG9ydCB7IFF1ZXJ5Q2xpZW50LCBRdWVyeUNsaWVudFByb3ZpZGVyIH0gZnJvbSAnQHRhbnN0YWNrL3JlYWN0LXF1ZXJ5J1xuaW1wb3J0IHsgV2FnbWlQcm92aWRlciB9IGZyb20gJ3dhZ21pJ1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9yb3V0ZXInXG5pbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB0aGVtZSBmcm9tICcuLi9zdHlsZXMvdGhlbWUnXG5cbmNvbnN0IGNvbmZpZyA9IGNyZWF0ZUNvbmZpZyh7XG4gIGNoYWluczogW21haW5uZXQsIHNlcG9saWFdLFxuICB0cmFuc3BvcnRzOiB7XG4gICAgW21haW5uZXQuaWRdOiBodHRwKCksXG4gICAgW3NlcG9saWEuaWRdOiBodHRwKClcbiAgfVxufSlcblxuY29uc3QgcXVlcnlDbGllbnQgPSBuZXcgUXVlcnlDbGllbnQoKVxuXG5mdW5jdGlvbiBNeUFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH06IEFwcFByb3BzKSB7XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpXG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAvLyBIYW5kbGUgcm91dGUgY2hhbmdlc1xuICAgIGNvbnN0IGhhbmRsZVJvdXRlQ2hhbmdlID0gKHVybDogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnUm91dGUgY2hhbmdpbmcgdG86JywgdXJsKVxuICAgIH1cblxuICAgIGNvbnN0IGhhbmRsZVJvdXRlQ2hhbmdlQ29tcGxldGUgPSAodXJsOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdSb3V0ZSBjaGFuZ2UgY29tcGxldGVkOicsIHVybClcbiAgICB9XG5cbiAgICBjb25zdCBoYW5kbGVSb3V0ZUNoYW5nZUVycm9yID0gKGVycjogYW55LCB1cmw6IHN0cmluZykgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcignUm91dGUgY2hhbmdlIGVycm9yOicsIHsgdXJsLCBlcnIgfSlcbiAgICB9XG5cbiAgICByb3V0ZXIuZXZlbnRzLm9uKCdyb3V0ZUNoYW5nZVN0YXJ0JywgaGFuZGxlUm91dGVDaGFuZ2UpXG4gICAgcm91dGVyLmV2ZW50cy5vbigncm91dGVDaGFuZ2VDb21wbGV0ZScsIGhhbmRsZVJvdXRlQ2hhbmdlQ29tcGxldGUpXG4gICAgcm91dGVyLmV2ZW50cy5vbigncm91dGVDaGFuZ2VFcnJvcicsIGhhbmRsZVJvdXRlQ2hhbmdlRXJyb3IpXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgcm91dGVyLmV2ZW50cy5vZmYoJ3JvdXRlQ2hhbmdlU3RhcnQnLCBoYW5kbGVSb3V0ZUNoYW5nZSlcbiAgICAgIHJvdXRlci5ldmVudHMub2ZmKCdyb3V0ZUNoYW5nZUNvbXBsZXRlJywgaGFuZGxlUm91dGVDaGFuZ2VDb21wbGV0ZSlcbiAgICAgIHJvdXRlci5ldmVudHMub2ZmKCdyb3V0ZUNoYW5nZUVycm9yJywgaGFuZGxlUm91dGVDaGFuZ2VFcnJvcilcbiAgICB9XG4gIH0sIFtyb3V0ZXJdKVxuXG4gIHJldHVybiAoXG4gICAgPFF1ZXJ5Q2xpZW50UHJvdmlkZXIgY2xpZW50PXtxdWVyeUNsaWVudH0+XG4gICAgICA8V2FnbWlQcm92aWRlciBjb25maWc9e2NvbmZpZ30+XG4gICAgICAgIDxDaGFrcmFQcm92aWRlciB0aGVtZT17dGhlbWV9PlxuICAgICAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cbiAgICAgICAgPC9DaGFrcmFQcm92aWRlcj5cbiAgICAgIDwvV2FnbWlQcm92aWRlcj5cbiAgICA8L1F1ZXJ5Q2xpZW50UHJvdmlkZXI+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgTXlBcHAgIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ2hha3JhUHJvdmlkZXIiLCJjcmVhdGVDb25maWciLCJodHRwIiwibWFpbm5ldCIsInNlcG9saWEiLCJRdWVyeUNsaWVudCIsIlF1ZXJ5Q2xpZW50UHJvdmlkZXIiLCJXYWdtaVByb3ZpZGVyIiwidXNlUm91dGVyIiwidXNlRWZmZWN0IiwidGhlbWUiLCJjb25maWciLCJjaGFpbnMiLCJ0cmFuc3BvcnRzIiwiaWQiLCJxdWVyeUNsaWVudCIsIk15QXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIiwicm91dGVyIiwiaGFuZGxlUm91dGVDaGFuZ2UiLCJ1cmwiLCJjb25zb2xlIiwibG9nIiwiaGFuZGxlUm91dGVDaGFuZ2VDb21wbGV0ZSIsImhhbmRsZVJvdXRlQ2hhbmdlRXJyb3IiLCJlcnIiLCJlcnJvciIsImV2ZW50cyIsIm9uIiwib2ZmIiwiY2xpZW50Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "./styles/theme.ts":
/*!*************************!*\
  !*** ./styles/theme.ts ***!
  \*************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @chakra-ui/react */ \"@chakra-ui/react\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__]);\n_chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nconst theme = (0,_chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__.extendTheme)({\n    config: {\n        initialColorMode: \"light\",\n        useSystemColorMode: false\n    },\n    styles: {\n        global: {\n            body: {\n                bg: \"white\",\n                color: \"gray.800\"\n            }\n        }\n    }\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (theme);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zdHlsZXMvdGhlbWUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBOEM7QUFFOUMsTUFBTUMsUUFBUUQsNkRBQVdBLENBQUM7SUFDeEJFLFFBQVE7UUFDTkMsa0JBQWtCO1FBQ2xCQyxvQkFBb0I7SUFDdEI7SUFDQUMsUUFBUTtRQUNOQyxRQUFRO1lBQ05DLE1BQU07Z0JBQ0pDLElBQUk7Z0JBQ0pDLE9BQU87WUFDVDtRQUNGO0lBQ0Y7QUFDRjtBQUVBLGlFQUFlUixLQUFLQSxFQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZWR1Y2F0aW9uLWRhcHAtZnJvbnRlbmQvLi9zdHlsZXMvdGhlbWUudHM/Njk2YiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBleHRlbmRUaGVtZSB9IGZyb20gJ0BjaGFrcmEtdWkvcmVhY3QnXG5cbmNvbnN0IHRoZW1lID0gZXh0ZW5kVGhlbWUoe1xuICBjb25maWc6IHtcbiAgICBpbml0aWFsQ29sb3JNb2RlOiAnbGlnaHQnLFxuICAgIHVzZVN5c3RlbUNvbG9yTW9kZTogZmFsc2UsXG4gIH0sXG4gIHN0eWxlczoge1xuICAgIGdsb2JhbDoge1xuICAgICAgYm9keToge1xuICAgICAgICBiZzogJ3doaXRlJyxcbiAgICAgICAgY29sb3I6ICdncmF5LjgwMCcsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KVxuXG5leHBvcnQgZGVmYXVsdCB0aGVtZSAiXSwibmFtZXMiOlsiZXh0ZW5kVGhlbWUiLCJ0aGVtZSIsImNvbmZpZyIsImluaXRpYWxDb2xvck1vZGUiLCJ1c2VTeXN0ZW1Db2xvck1vZGUiLCJzdHlsZXMiLCJnbG9iYWwiLCJib2R5IiwiYmciLCJjb2xvciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./styles/theme.ts\n");

/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "@chakra-ui/react":
/*!***********************************!*\
  !*** external "@chakra-ui/react" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = import("@chakra-ui/react");;

/***/ }),

/***/ "@tanstack/react-query":
/*!****************************************!*\
  !*** external "@tanstack/react-query" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@tanstack/react-query");;

/***/ }),

/***/ "wagmi":
/*!************************!*\
  !*** external "wagmi" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = import("wagmi");;

/***/ }),

/***/ "wagmi/chains":
/*!*******************************!*\
  !*** external "wagmi/chains" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = import("wagmi/chains");;

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("./pages/_app.tsx")));
module.exports = __webpack_exports__;

})();