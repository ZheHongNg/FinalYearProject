import "./App.css";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { themeSettings } from "./theme";


import Homepage from "./Pages/Homepage";
import { Route, BrowserRouter } from "react-router-dom";
import Chatpage from "./Pages/Chatpage";
import Forum from "./components/scenes/forum";
import AdminPage from "./Pages/adminPage";
import EditPostPage from "./components/PostEditPage/PostEdit";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="App">


      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Route path="/" component={Homepage} exact />
          <Route path="/chats" component={Chatpage} />
          <Route path="/AdminPage" component={AdminPage} />
          <Route path="/PostEdit" component={EditPostPage} />
          <Route path="/forum" component={Forum} />
        </ThemeProvider>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
