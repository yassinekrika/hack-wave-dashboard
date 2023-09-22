// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import { QueryClient, QueryClientProvider } from "react-query";

import './style.css'


// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeCustomization>
        <ScrollTop>
          <Routes />
        </ScrollTop>
      </ThemeCustomization>
    </QueryClientProvider>
  )
};

export default App;
