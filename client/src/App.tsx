import { Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Privacy from "./pages/Privacy";
import Download from "./pages/Download";
import FeatureRota from "./pages/FeatureRota";
import FeaturePayroll from "./pages/FeaturePayroll";
import FeatureScorecard from "./pages/FeatureScorecard";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Switch>
            <Route path="/admin" component={Admin} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/download" component={Download} />
            <Route path="/features/rota" component={FeatureRota} />
            <Route path="/features/payroll" component={FeaturePayroll} />
            <Route path="/features/scorecard" component={FeatureScorecard} />
            <Route path="/blog" component={Blog} />
            <Route path="/blog/:slug" component={BlogPost} />
            <Route path="/" component={Home} />
            <Route component={NotFound} />
          </Switch>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
export default App;
