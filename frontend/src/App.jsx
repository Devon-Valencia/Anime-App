import { Stack, Box } from "@chakra-ui/react";
import axios from "axios";
import Routing from "./components/Routing"; 
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import '/index.css'; 

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Box backgroundColor="#0b1622" minHeight="100vh">
        <Stack minH={"100vh"} spacing={8}>
          <Routing />
        </Stack>
      </Box>
    </QueryClientProvider>
  );
}
export default App;