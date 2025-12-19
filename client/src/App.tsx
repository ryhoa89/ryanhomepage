import { Switch, Route, Router } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Desktop from "@/pages/Desktop";

function Routes() {
  return (
    <Switch>
      <Route path="/" component={Desktop} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router base="/ryanhomepage/">
        <Toaster />
        <Routes />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
