import Header from "./components/Header"
import MainContent from "./components/Main"
import Footer from "./components/Footer"
import "./App.css"

export default function App(){
  return(
    <div className="container">
      <Header />
      <MainContent />
      <Footer />
    </div>
  )
}