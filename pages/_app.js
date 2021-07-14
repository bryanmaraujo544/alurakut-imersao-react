import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { AlurakutStyles } from '../src/lib/AlurakutCommons'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background: none;
    border: none;
    list-style: none;
    text-decoration: none;
  }

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: sans-serif;
    background-color: #d9e6f6;
  }

  img{
    max-width: 100%;
    height: auto;
    display: block;
  }

  ${AlurakutStyles}


`

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
