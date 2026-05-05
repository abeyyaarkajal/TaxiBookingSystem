import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/App.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=dd2f12ff"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("C:/Users/msi/Desktop/Project/TaxiBookingSystem/TaxiBookingWeb/src/App.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=dd2f12ff"; const React = __vite__cjsImport3_react.__esModule ? __vite__cjsImport3_react.default : __vite__cjsImport3_react; const useState = __vite__cjsImport3_react["useState"]; const useEffect = __vite__cjsImport3_react["useEffect"];
import { BrowserRouter as Router, Routes, Route, Navigate } from "/node_modules/.vite/deps/react-router-dom.js?v=f1b1a8e6";
import HomeScreen from "/src/screens/HomeScreen.jsx";
import LocationSelectionScreen from "/src/screens/LocationSelectionScreen.jsx";
import FareEstimateScreen from "/src/screens/FareEstimateScreen.jsx";
import SearchingDriverScreen from "/src/screens/SearchingDriverScreen.jsx";
import DriverAssignedScreen from "/src/screens/DriverAssignedScreen.jsx";
import LiveTrackingScreen from "/src/screens/LiveTrackingScreen.jsx";
import TripSummaryScreen from "/src/screens/TripSummaryScreen.jsx";
import websocketService from "/src/services/websocketService.js";
function App() {
  _s();
  const [rideData, setRideData] = useState(null);
  const [currentScreen, setCurrentScreen] = useState("home");
  const [error, setError] = useState(null);
  useEffect(() => {
    const initializeWebSocket = async () => {
      try {
        await websocketService.connect(
          (locationData) => {
            console.log("Location update:", locationData);
            if (rideData) {
              setRideData({
                ...rideData,
                driverLocation: locationData
              });
            }
          },
          (rideUpdate) => {
            console.log("Ride update:", rideUpdate);
            if (rideData) {
              setRideData({
                ...rideData,
                status: rideUpdate.status
              });
            }
          }
        );
      } catch (error2) {
        console.error("WebSocket connection failed:", error2);
        setError("Real-time updates unavailable. You can still book rides.");
      }
    };
    initializeWebSocket();
    return () => {
      websocketService.disconnect();
    };
  }, []);
  const navigateTo = (screen, data = null) => {
    if (data) {
      setRideData({ ...rideData, ...data });
    }
    setCurrentScreen(screen);
  };
  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return /* @__PURE__ */ jsxDEV(HomeScreen, { onNavigate: navigateTo }, void 0, false, {
          fileName: "C:/Users/msi/Desktop/Project/TaxiBookingSystem/TaxiBookingWeb/src/App.jsx",
          lineNumber: 85,
          columnNumber: 16
        }, this);
      case "location":
        return /* @__PURE__ */ jsxDEV(LocationSelectionScreen, { onNavigate: navigateTo, rideData }, void 0, false, {
          fileName: "C:/Users/msi/Desktop/Project/TaxiBookingSystem/TaxiBookingWeb/src/App.jsx",
          lineNumber: 87,
          columnNumber: 16
        }, this);
      case "fare":
        return /* @__PURE__ */ jsxDEV(FareEstimateScreen, { onNavigate: navigateTo, rideData }, void 0, false, {
          fileName: "C:/Users/msi/Desktop/Project/TaxiBookingSystem/TaxiBookingWeb/src/App.jsx",
          lineNumber: 89,
          columnNumber: 16
        }, this);
      case "searching":
        return /* @__PURE__ */ jsxDEV(SearchingDriverScreen, { onNavigate: navigateTo, rideData }, void 0, false, {
          fileName: "C:/Users/msi/Desktop/Project/TaxiBookingSystem/TaxiBookingWeb/src/App.jsx",
          lineNumber: 91,
          columnNumber: 16
        }, this);
      case "assigned":
        return /* @__PURE__ */ jsxDEV(DriverAssignedScreen, { onNavigate: navigateTo, rideData }, void 0, false, {
          fileName: "C:/Users/msi/Desktop/Project/TaxiBookingSystem/TaxiBookingWeb/src/App.jsx",
          lineNumber: 93,
          columnNumber: 16
        }, this);
      case "tracking":
        return /* @__PURE__ */ jsxDEV(LiveTrackingScreen, { onNavigate: navigateTo, rideData }, void 0, false, {
          fileName: "C:/Users/msi/Desktop/Project/TaxiBookingSystem/TaxiBookingWeb/src/App.jsx",
          lineNumber: 95,
          columnNumber: 16
        }, this);
      case "summary":
        return /* @__PURE__ */ jsxDEV(TripSummaryScreen, { onNavigate: navigateTo, rideData }, void 0, false, {
          fileName: "C:/Users/msi/Desktop/Project/TaxiBookingSystem/TaxiBookingWeb/src/App.jsx",
          lineNumber: 97,
          columnNumber: 16
        }, this);
      default:
        return /* @__PURE__ */ jsxDEV(HomeScreen, { onNavigate: navigateTo }, void 0, false, {
          fileName: "C:/Users/msi/Desktop/Project/TaxiBookingSystem/TaxiBookingWeb/src/App.jsx",
          lineNumber: 99,
          columnNumber: 16
        }, this);
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "container", children: [
    error && /* @__PURE__ */ jsxDEV("div", { className: "info", style: { margin: "10px" }, children: [
      "âš ï¸ ",
      error
    ] }, void 0, true, {
      fileName: "C:/Users/msi/Desktop/Project/TaxiBookingSystem/TaxiBookingWeb/src/App.jsx",
      lineNumber: 106,
      columnNumber: 7
    }, this),
    renderScreen()
  ] }, void 0, true, {
    fileName: "C:/Users/msi/Desktop/Project/TaxiBookingSystem/TaxiBookingWeb/src/App.jsx",
    lineNumber: 104,
    columnNumber: 5
  }, this);
}
_s(App, "HK40Qji0O+0wDb0JLjEI5c8nvJM=");
_c = App;
export default App;
var _c;
$RefreshReg$(_c, "App");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("C:/Users/msi/Desktop/Project/TaxiBookingSystem/TaxiBookingWeb/src/App.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("C:/Users/msi/Desktop/Project/TaxiBookingSystem/TaxiBookingWeb/src/App.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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WUFBWUEsY0FBeEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUFtQztBQUFBLElBQzlDO0FBQUEsRUFDRjtBQUVBLFNBQ0UsdUJBQUMsU0FBSSxXQUFVLGFBQ1pYO0FBQUFBLGFBQ0MsdUJBQUMsU0FBSSxXQUFVLFFBQU8sT0FBTyxFQUFFZSxRQUFRLE9BQU8sR0FBRztBQUFBO0FBQUEsTUFDM0NmO0FBQUFBLFNBRE47QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUVBO0FBQUEsSUFFRGMsYUFBYTtBQUFBLE9BTmhCO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FPQTtBQUVKO0FBQUNuQixHQWxGUUQsS0FBRztBQUFBLEtBQUhBO0FBb0ZULGVBQWVBO0FBQUksSUFBQXNCO0FBQUEsYUFBQUEsSUFBQSIsIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJCcm93c2VyUm91dGVyIiwiUm91dGVyIiwiUm91dGVzIiwiUm91dGUiLCJOYXZpZ2F0ZSIsIkhvbWVTY3JlZW4iLCJMb2NhdGlvblNlbGVjdGlvblNjcmVlbiIsIkZhcmVFc3RpbWF0ZVNjcmVlbiIsIlNlYXJjaGluZ0RyaXZlclNjcmVlbiIsIkRyaXZlckFzc2lnbmVkU2NyZWVuIiwiTGl2ZVRyYWNraW5nU2NyZWVuIiwiVHJpcFN1bW1hcnlTY3JlZW4iLCJ3ZWJzb2NrZXRTZXJ2aWNlIiwiQXBwIiwiX3MiLCJyaWRlRGF0YSIsInNldFJpZGVEYXRhIiwiY3VycmVudFNjcmVlbiIsInNldEN1cnJlbnRTY3JlZW4iLCJlcnJvciIsInNldEVycm9yIiwiaW5pdGlhbGl6ZVdlYlNvY2tldCIsImNvbm5lY3QiLCJsb2NhdGlvbkRhdGEiLCJjb25zb2xlIiwibG9nIiwiZHJpdmVyTG9jYXRpb24iLCJyaWRlVXBkYXRlIiwic3RhdHVzIiwiZGlzY29ubmVjdCIsIm5hdmlnYXRlVG8iLCJzY3JlZW4iLCJkYXRhIiwicmVuZGVyU2NyZWVuIiwibWFyZ2luIiwiX2MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiQXBwLmpzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQnJvd3NlclJvdXRlciBhcyBSb3V0ZXIsIFJvdXRlcywgUm91dGUsIE5hdmlnYXRlIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcbmltcG9ydCBIb21lU2NyZWVuIGZyb20gJy4vc2NyZWVucy9Ib21lU2NyZWVuJztcclxuaW1wb3J0IExvY2F0aW9uU2VsZWN0aW9uU2NyZWVuIGZyb20gJy4vc2NyZWVucy9Mb2NhdGlvblNlbGVjdGlvblNjcmVlbic7XHJcbmltcG9ydCBGYXJlRXN0aW1hdGVTY3JlZW4gZnJvbSAnLi9zY3JlZW5zL0ZhcmVFc3RpbWF0ZVNjcmVlbic7XHJcbmltcG9ydCBTZWFyY2hpbmdEcml2ZXJTY3JlZW4gZnJvbSAnLi9zY3JlZW5zL1NlYXJjaGluZ0RyaXZlclNjcmVlbic7XHJcbmltcG9ydCBEcml2ZXJBc3NpZ25lZFNjcmVlbiBmcm9tICcuL3NjcmVlbnMvRHJpdmVyQXNzaWduZWRTY3JlZW4nO1xyXG5pbXBvcnQgTGl2ZVRyYWNraW5nU2NyZWVuIGZyb20gJy4vc2NyZWVucy9MaXZlVHJhY2tpbmdTY3JlZW4nO1xyXG5pbXBvcnQgVHJpcFN1bW1hcnlTY3JlZW4gZnJvbSAnLi9zY3JlZW5zL1RyaXBTdW1tYXJ5U2NyZWVuJztcclxuaW1wb3J0IHdlYnNvY2tldFNlcnZpY2UgZnJvbSAnLi9zZXJ2aWNlcy93ZWJzb2NrZXRTZXJ2aWNlJztcclxuXHJcbmZ1bmN0aW9uIEFwcCgpIHtcclxuICBjb25zdCBbcmlkZURhdGEsIHNldFJpZGVEYXRhXSA9IHVzZVN0YXRlKG51bGwpO1xyXG4gIGNvbnN0IFtjdXJyZW50U2NyZWVuLCBzZXRDdXJyZW50U2NyZWVuXSA9IHVzZVN0YXRlKCdob21lJyk7XHJcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZShudWxsKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIC8vIEluaXRpYWxpemUgV2ViU29ja2V0IGNvbm5lY3Rpb25cclxuICAgIGNvbnN0IGluaXRpYWxpemVXZWJTb2NrZXQgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgYXdhaXQgd2Vic29ja2V0U2VydmljZS5jb25uZWN0KFxyXG4gICAgICAgICAgKGxvY2F0aW9uRGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAvLyBIYW5kbGUgbG9jYXRpb24gdXBkYXRlXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMb2NhdGlvbiB1cGRhdGU6JywgbG9jYXRpb25EYXRhKTtcclxuICAgICAgICAgICAgaWYgKHJpZGVEYXRhKSB7XHJcbiAgICAgICAgICAgICAgc2V0UmlkZURhdGEoe1xyXG4gICAgICAgICAgICAgICAgLi4ucmlkZURhdGEsXHJcbiAgICAgICAgICAgICAgICBkcml2ZXJMb2NhdGlvbjogbG9jYXRpb25EYXRhLFxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgKHJpZGVVcGRhdGUpID0+IHtcclxuICAgICAgICAgICAgLy8gSGFuZGxlIHJpZGUgc3RhdHVzIHVwZGF0ZVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnUmlkZSB1cGRhdGU6JywgcmlkZVVwZGF0ZSk7XHJcbiAgICAgICAgICAgIGlmIChyaWRlRGF0YSkge1xyXG4gICAgICAgICAgICAgIHNldFJpZGVEYXRhKHtcclxuICAgICAgICAgICAgICAgIC4uLnJpZGVEYXRhLFxyXG4gICAgICAgICAgICAgICAgc3RhdHVzOiByaWRlVXBkYXRlLnN0YXR1cyxcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignV2ViU29ja2V0IGNvbm5lY3Rpb24gZmFpbGVkOicsIGVycm9yKTtcclxuICAgICAgICBzZXRFcnJvcignUmVhbC10aW1lIHVwZGF0ZXMgdW5hdmFpbGFibGUuIFlvdSBjYW4gc3RpbGwgYm9vayByaWRlcy4nKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBpbml0aWFsaXplV2ViU29ja2V0KCk7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgd2Vic29ja2V0U2VydmljZS5kaXNjb25uZWN0KCk7XHJcbiAgICB9O1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgbmF2aWdhdGVUbyA9IChzY3JlZW4sIGRhdGEgPSBudWxsKSA9PiB7XHJcbiAgICBpZiAoZGF0YSkge1xyXG4gICAgICBzZXRSaWRlRGF0YSh7IC4uLnJpZGVEYXRhLCAuLi5kYXRhIH0pO1xyXG4gICAgfVxyXG4gICAgc2V0Q3VycmVudFNjcmVlbihzY3JlZW4pO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHJlbmRlclNjcmVlbiA9ICgpID0+IHtcclxuICAgIHN3aXRjaCAoY3VycmVudFNjcmVlbikge1xyXG4gICAgICBjYXNlICdob21lJzpcclxuICAgICAgICByZXR1cm4gPEhvbWVTY3JlZW4gb25OYXZpZ2F0ZT17bmF2aWdhdGVUb30gLz47XHJcbiAgICAgIGNhc2UgJ2xvY2F0aW9uJzpcclxuICAgICAgICByZXR1cm4gPExvY2F0aW9uU2VsZWN0aW9uU2NyZWVuIG9uTmF2aWdhdGU9e25hdmlnYXRlVG99IHJpZGVEYXRhPXtyaWRlRGF0YX0gLz47XHJcbiAgICAgIGNhc2UgJ2ZhcmUnOlxyXG4gICAgICAgIHJldHVybiA8RmFyZUVzdGltYXRlU2NyZWVuIG9uTmF2aWdhdGU9e25hdmlnYXRlVG99IHJpZGVEYXRhPXtyaWRlRGF0YX0gLz47XHJcbiAgICAgIGNhc2UgJ3NlYXJjaGluZyc6XHJcbiAgICAgICAgcmV0dXJuIDxTZWFyY2hpbmdEcml2ZXJTY3JlZW4gb25OYXZpZ2F0ZT17bmF2aWdhdGVUb30gcmlkZURhdGE9e3JpZGVEYXRhfSAvPjtcclxuICAgICAgY2FzZSAnYXNzaWduZWQnOlxyXG4gICAgICAgIHJldHVybiA8RHJpdmVyQXNzaWduZWRTY3JlZW4gb25OYXZpZ2F0ZT17bmF2aWdhdGVUb30gcmlkZURhdGE9e3JpZGVEYXRhfSAvPjtcclxuICAgICAgY2FzZSAndHJhY2tpbmcnOlxyXG4gICAgICAgIHJldHVybiA8TGl2ZVRyYWNraW5nU2NyZWVuIG9uTmF2aWdhdGU9e25hdmlnYXRlVG99IHJpZGVEYXRhPXtyaWRlRGF0YX0gLz47XHJcbiAgICAgIGNhc2UgJ3N1bW1hcnknOlxyXG4gICAgICAgIHJldHVybiA8VHJpcFN1bW1hcnlTY3JlZW4gb25OYXZpZ2F0ZT17bmF2aWdhdGVUb30gcmlkZURhdGE9e3JpZGVEYXRhfSAvPjtcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4gPEhvbWVTY3JlZW4gb25OYXZpZ2F0ZT17bmF2aWdhdGVUb30gLz47XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XHJcbiAgICAgIHtlcnJvciAmJiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbmZvXCIgc3R5bGU9e3sgbWFyZ2luOiAnMTBweCcgfX0+XHJcbiAgICAgICAgICDimqDvuI8ge2Vycm9yfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApfVxyXG4gICAgICB7cmVuZGVyU2NyZWVuKCl9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcHA7XHJcbiJdLCJmaWxlIjoiQzovVXNlcnMvbXNpL0Rlc2t0b3AvUHJvamVjdC9UYXhpQm9va2luZ1N5c3RlbS9UYXhpQm9va2luZ1dlYi9zcmMvQXBwLmpzeCJ9
