import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/screens/HomeScreen.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=dd2f12ff"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("C:/Users/msi/Desktop/Project/TaxiBookingSystem/TaxiBookingWeb/src/screens/HomeScreen.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=dd2f12ff"; const React = __vite__cjsImport3_react.__esModule ? __vite__cjsImport3_react.default : __vite__cjsImport3_react;
function HomeScreen({ onNavigate }) {
  return /* @__PURE__ */ jsxDEV("div", { className: "screen", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "header", children: "Taxi Booking System" }, void 0, false, {
      fileName: "C:/Users/msi/Desktop/Project/TaxiBookingSystem/TaxiBookingWeb/src/screens/HomeScreen.jsx",
      lineNumber: 25,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { style: { flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }, children: [
      /* @__PURE__ */ jsxDEV("div", { className: "map-container", children: "ðŸ“ Current Location Map" }, void 0, false, {
        fileName: "C:/Users/msi/Desktop/Project/TaxiBookingSystem/TaxiBookingWeb/src/screens/HomeScreen.jsx",
        lineNumber: 28,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("h2", { style: { marginTop: "20px", color: "#333" }, children: "Welcome Rider" }, void 0, false, {
        fileName: "C:/Users/msi/Desktop/Project/TaxiBookingSystem/TaxiBookingWeb/src/screens/HomeScreen.jsx",
        lineNumber: 32,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("p", { style: { color: "#999", marginBottom: "20px", textAlign: "center" }, children: "Quick, reliable, and affordable rides at your fingertips" }, void 0, false, {
        fileName: "C:/Users/msi/Desktop/Project/TaxiBookingSystem/TaxiBookingWeb/src/screens/HomeScreen.jsx",
        lineNumber: 33,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          className: "button",
          onClick: () => onNavigate("location"),
          style: { width: "100%" },
          children: "ðŸ“ Book a Ride"
        },
        void 0,
        false,
        {
          fileName: "C:/Users/msi/Desktop/Project/TaxiBookingSystem/TaxiBookingWeb/src/screens/HomeScreen.jsx",
          lineNumber: 37,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          className: "button secondary",
          onClick: () => {
          },
          style: { width: "100%" },
          children: "ðŸ‘¤ Profile"
        },
        void 0,
        false,
        {
          fileName: "C:/Users/msi/Desktop/Project/TaxiBookingSystem/TaxiBookingWeb/src/screens/HomeScreen.jsx",
          lineNumber: 45,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          className: "button secondary",
          onClick: () => {
          },
          style: { width: "100%" },
          children: "ðŸŽŸï¸ Ride History"
        },
        void 0,
        false,
        {
          fileName: "C:/Users/msi/Desktop/Project/TaxiBookingSystem/TaxiBookingWeb/src/screens/HomeScreen.jsx",
          lineNumber: 53,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "C:/Users/msi/Desktop/Project/TaxiBookingSystem/TaxiBookingWeb/src/screens/HomeScreen.jsx",
      lineNumber: 27,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/msi/Desktop/Project/TaxiBookingSystem/TaxiBookingWeb/src/screens/HomeScreen.jsx",
    lineNumber: 24,
    columnNumber: 5
  }, this);
}
_c = HomeScreen;
export default HomeScreen;
var _c;
$RefreshReg$(_c, "HomeScreen");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("C:/Users/msi/Desktop/Project/TaxiBookingSystem/TaxiBookingWeb/src/screens/HomeScreen.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("C:/Users/msi/Desktop/Project/TaxiBookingSystem/TaxiBookingWeb/src/screens/HomeScreen.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBS007Ozs7Ozs7Ozs7Ozs7Ozs7QUFMTixPQUFPQSxXQUFXO0FBRWxCLFNBQVNDLFdBQVcsRUFBRUMsV0FBVyxHQUFHO0FBQ2xDLFNBQ0UsdUJBQUMsU0FBSSxXQUFVLFVBQ2I7QUFBQSwyQkFBQyxTQUFJLFdBQVUsVUFBUyxtQ0FBeEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUEyQztBQUFBLElBRTNDLHVCQUFDLFNBQUksT0FBTyxFQUFFQyxNQUFNLEdBQUdDLFNBQVMsUUFBUUMsZUFBZSxVQUFVQyxnQkFBZ0IsVUFBVUMsWUFBWSxTQUFTLEdBQzlHO0FBQUEsNkJBQUMsU0FBSSxXQUFVLGlCQUFnQix1Q0FBL0I7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUVBO0FBQUEsTUFFQSx1QkFBQyxRQUFHLE9BQU8sRUFBRUMsV0FBVyxRQUFRQyxPQUFPLE9BQU8sR0FBRyw2QkFBakQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUE4RDtBQUFBLE1BQzlELHVCQUFDLE9BQUUsT0FBTyxFQUFFQSxPQUFPLFFBQVFDLGNBQWMsUUFBUUMsV0FBVyxTQUFTLEdBQUcsd0VBQXhFO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFFQTtBQUFBLE1BRUE7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDLFdBQVU7QUFBQSxVQUNWLFNBQVMsTUFBTVQsV0FBVyxVQUFVO0FBQUEsVUFDcEMsT0FBTyxFQUFFVSxPQUFPLE9BQU87QUFBQSxVQUFFO0FBQUE7QUFBQSxRQUgzQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFNQTtBQUFBLE1BRUE7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDLFdBQVU7QUFBQSxVQUNWLFNBQVMsTUFBTTtBQUFBLFVBQUM7QUFBQSxVQUNoQixPQUFPLEVBQUVBLE9BQU8sT0FBTztBQUFBLFVBQUU7QUFBQTtBQUFBLFFBSDNCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQU1BO0FBQUEsTUFFQTtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsV0FBVTtBQUFBLFVBQ1YsU0FBUyxNQUFNO0FBQUEsVUFBQztBQUFBLFVBQ2hCLE9BQU8sRUFBRUEsT0FBTyxPQUFPO0FBQUEsVUFBRTtBQUFBO0FBQUEsUUFIM0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BTUE7QUFBQSxTQWhDRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBaUNBO0FBQUEsT0FwQ0Y7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQXFDQTtBQUVKO0FBQUNDLEtBekNRWjtBQTJDVCxlQUFlQTtBQUFXLElBQUFZO0FBQUEsYUFBQUEsSUFBQSIsIm5hbWVzIjpbIlJlYWN0IiwiSG9tZVNjcmVlbiIsIm9uTmF2aWdhdGUiLCJmbGV4IiwiZGlzcGxheSIsImZsZXhEaXJlY3Rpb24iLCJqdXN0aWZ5Q29udGVudCIsImFsaWduSXRlbXMiLCJtYXJnaW5Ub3AiLCJjb2xvciIsIm1hcmdpbkJvdHRvbSIsInRleHRBbGlnbiIsIndpZHRoIiwiX2MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiSG9tZVNjcmVlbi5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuXHJcbmZ1bmN0aW9uIEhvbWVTY3JlZW4oeyBvbk5hdmlnYXRlIH0pIHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzY3JlZW5cIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXJcIj5UYXhpIEJvb2tpbmcgU3lzdGVtPC9kaXY+XHJcbiAgICAgIFxyXG4gICAgICA8ZGl2IHN0eWxlPXt7IGZsZXg6IDEsIGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJywgYWxpZ25JdGVtczogJ2NlbnRlcicgfX0+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXAtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICDwn5ONIEN1cnJlbnQgTG9jYXRpb24gTWFwXHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgXHJcbiAgICAgICAgPGgyIHN0eWxlPXt7IG1hcmdpblRvcDogJzIwcHgnLCBjb2xvcjogJyMzMzMnIH19PldlbGNvbWUgUmlkZXI8L2gyPlxyXG4gICAgICAgIDxwIHN0eWxlPXt7IGNvbG9yOiAnIzk5OScsIG1hcmdpbkJvdHRvbTogJzIwcHgnLCB0ZXh0QWxpZ246ICdjZW50ZXInIH19PlxyXG4gICAgICAgICAgUXVpY2ssIHJlbGlhYmxlLCBhbmQgYWZmb3JkYWJsZSByaWRlcyBhdCB5b3VyIGZpbmdlcnRpcHNcclxuICAgICAgICA8L3A+XHJcbiAgICAgICAgXHJcbiAgICAgICAgPGJ1dHRvbiBcclxuICAgICAgICAgIGNsYXNzTmFtZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbk5hdmlnYXRlKCdsb2NhdGlvbicpfVxyXG4gICAgICAgICAgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJyB9fVxyXG4gICAgICAgID5cclxuICAgICAgICAgIPCfk40gQm9vayBhIFJpZGVcclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICBcclxuICAgICAgICA8YnV0dG9uIFxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwiYnV0dG9uIHNlY29uZGFyeVwiXHJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7fX1cclxuICAgICAgICAgIHN0eWxlPXt7IHdpZHRoOiAnMTAwJScgfX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICDwn5GkIFByb2ZpbGVcclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICBcclxuICAgICAgICA8YnV0dG9uIFxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwiYnV0dG9uIHNlY29uZGFyeVwiXHJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7fX1cclxuICAgICAgICAgIHN0eWxlPXt7IHdpZHRoOiAnMTAwJScgfX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICDwn46f77iPIFJpZGUgSGlzdG9yeVxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhvbWVTY3JlZW47XHJcbiJdLCJmaWxlIjoiQzovVXNlcnMvbXNpL0Rlc2t0b3AvUHJvamVjdC9UYXhpQm9va2luZ1N5c3RlbS9UYXhpQm9va2luZ1dlYi9zcmMvc2NyZWVucy9Ib21lU2NyZWVuLmpzeCJ9
