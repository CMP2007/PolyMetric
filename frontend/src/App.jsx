import { useEffect } from 'react'
import { checkHealth } from './services/health'

function App() {
  useEffect(() => {
    checkHealth()
      .then((data) => console.log('🟢 Conexión exitosa:', data))
      .catch((error) => console.error('🔴 Error de conexión:', error))
  }, [])

  return 'PolyMetric Dashboard'
}

export default App
