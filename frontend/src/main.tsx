import { ChakraProvider } from '@chakra-ui/react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { vascoTheme } from './theme'

import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import { RQProvider } from './components/QueryClient'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider resetCSS theme={vascoTheme}>
      <RQProvider>
        <>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </>
      </RQProvider>
    </ChakraProvider>
  </React.StrictMode>
)
