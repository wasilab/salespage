import { Route, Routes } from "react-router-dom"
import { GrowWithUs } from "./homepage/GrowWithUs"
import { LegalPage } from "./legal/LegalPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<GrowWithUs />} />
      <Route path="/:doc" element={<LegalPage />} />
    </Routes>
  )
}

export default App
