import { lazy, Suspense, useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { trackPageView } from "./lib/tracking";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

// Code-split everything that isn't the homepage so initial JS payload stays small.
const Admin = lazy(() => import("./pages/Admin"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Download = lazy(() => import("./pages/Download"));
const AmazonDspManagementSoftware = lazy(() => import("./pages/AmazonDspManagementSoftware"));
const DriverPerformanceTracking = lazy(() => import("./pages/DriverPerformanceTracking"));
const VanInspectionApp = lazy(() => import("./pages/VanInspectionApp"));
const DspRotaManagement = lazy(() => import("./pages/DspRotaManagement"));
const DspInvoicingPayroll = lazy(() => import("./pages/DspInvoicingPayroll"));
const DspComplianceTools = lazy(() => import("./pages/DspComplianceTools"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));

function PageFallback() {
  return <div className="min-h-screen bg-background" aria-hidden="true" />;
}

// Fire an anonymous page-view beacon on first load and on every SPA navigation.
function usePageViewTracking() {
  const [location] = useLocation();
  useEffect(() => {
    trackPageView(location);
  }, [location]);
}

function App() {
  usePageViewTracking();

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Suspense fallback={<PageFallback />}>
            <Switch>
              <Route path="/admin" component={Admin} />
              <Route path="/privacy" component={Privacy} />
              <Route path="/download" component={Download} />
              <Route path="/amazon-dsp-management-software" component={AmazonDspManagementSoftware} />
              <Route path="/driver-performance-tracking" component={DriverPerformanceTracking} />
              <Route path="/van-inspection-app" component={VanInspectionApp} />
              <Route path="/dsp-rota-management" component={DspRotaManagement} />
              <Route path="/dsp-invoicing-payroll" component={DspInvoicingPayroll} />
              <Route path="/dsp-compliance-tools" component={DspComplianceTools} />
              <Route path="/blog" component={Blog} />
              <Route path="/blog/:slug" component={BlogPost} />
              <Route path="/" component={Home} />
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
export default App;
