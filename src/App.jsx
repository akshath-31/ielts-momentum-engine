import { useState } from 'react'
import InputScreen from './components/InputScreen'
import Dashboard from './components/Dashboard'

export default function App() {
  const [screen, setScreen] = useState('input') // 'input' | 'dashboard'
  const [userInputs, setUserInputs] = useState(null)

  const handleGenerate = (inputs) => {
    setUserInputs(inputs)
    setScreen('dashboard')
  }

  const handleReset = () => {
    setUserInputs(null)
    setScreen('input')
  }

  return (
    <>
      {screen === 'input' && (
        <InputScreen onGenerate={handleGenerate} />
      )}
      {screen === 'dashboard' && userInputs && (
        <Dashboard inputs={userInputs} onReset={handleReset} />
      )}
    </>
  )
}
