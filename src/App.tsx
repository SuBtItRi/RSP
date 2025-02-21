import { JSX, SetStateAction, useEffect, useRef, useState } from 'react'
import './App.scss'

const knb: Record<string, JSX.Element> = {
  'k': <img src="k.png" alt="k" style={{ width: 75 }} />,
  'n': <img src="n.png" alt="n" style={{ width: 75 }} />,
  'b': <img src="b.png" alt="b" style={{ width: 75 }} />
}
const knbK: string[] = Object.keys(knb)

const WinLoseDraw: Record<string, string> = {
  'kn': 'You Win',
  'kb': 'You Lose',
  'nk': 'You Lose',
  'nb': 'You Win',
  'bk': 'You Win',
  'bn': 'You Lose',
  'kk': 'Draw',
  'nn': 'Draw',
  'bb': 'Draw',
}

const WLDClasses: Record<string, string> = {
  'kn': 'win',
  'kb': 'lose',
  'nk': 'lose',
  'nb': 'win',
  'bk': 'win',
  'bn': 'lose',
  'kk': 'draw',
  'nn': 'draw',
  'bb': 'draw',
}

function App() {
  const [userChoice, setUserChoice] = useState<string | undefined>()
  const [botChoice, setBotChoice] = useState<string | undefined>()
  const [result, setResult] = useState<string | undefined>()
  const resultRef = useRef<HTMLHeadingElement | null>(null)
  const [countGame, setCountGame] = useState<number>(Number(localStorage.getItem('countGame')) || 0)
  const [winCount, setWinCount] = useState<number>(Number(localStorage.getItem('winCount')) || 0)
  const [loseCount, setLoseCount] = useState<number>(Number(localStorage.getItem('loseCount')) || 0)
  const [drawCount, setDrawCount] = useState<number>(Number(localStorage.getItem('drawCount')) || 0)

  const handleStartGame = (choice: SetStateAction<string | undefined>) => {
    setCountGame((count) => count + 1)
    setUserChoice(choice)
    setBotChoice(knbK[Math.floor(Math.random() * 3)])
  }

  useEffect(() => {
    // Сохранение данных в localStorage при изменении счетчиков
    localStorage.setItem('countGame', countGame.toString())
    localStorage.setItem('winCount', winCount.toString())
    localStorage.setItem('loseCount', loseCount.toString())
    localStorage.setItem('drawCount', drawCount.toString())
  }, [countGame, winCount, loseCount, drawCount])

  useEffect(() => {
    if (userChoice && botChoice) {
      const choiceToStr = `${userChoice}${botChoice}`
      setResult(WinLoseDraw[choiceToStr])
      if (resultRef.current) {
        resultRef.current.className = 'result'
        resultRef.current.classList.add(WLDClasses[choiceToStr])
      }
      switch (WinLoseDraw[choiceToStr]) {
        case 'You Win':
          setWinCount((count) => count + 1)
          break
        case 'You Lose':
          setLoseCount((count) => count + 1)
          break
        case 'Draw':
          setDrawCount((count) => count + 1)
          break
      }
    }
  }, [userChoice, botChoice])

  const handleRestart = () => {
    setUserChoice(undefined)
    setBotChoice(undefined)
  }

  return (
    <main className='main'>
      <h1 ref={resultRef} className='result'>{result}</h1>
      <h2>Камень ножницы бумага</h2>
      <h4>Сыграно игр: {countGame} | Выйграно: {winCount} | Проиграно: {loseCount} | Ничья: {drawCount}</h4>
      <h3>Выбор противника</h3>
      <div className="choice">
        {userChoice && <>{knb[`${botChoice}`]}</>}
      </div>
      <h3>Ваш выбор</h3>
      {userChoice ? (
        <>
          <div>{knb[userChoice]}</div>
          <div className="restart_container">
            <button className='restart' onClick={handleRestart}>Restart</button>
          </div>
        </>
      ) : (
        <div className="choice">
          <img src="k.png" alt="" style={{ width: 75 }} onClick={() => handleStartGame('k')} />
          <img src="n.png" alt="" style={{ width: 75 }} onClick={() => handleStartGame('n')} />
          <img src="b.png" alt="" style={{ width: 75 }} onClick={() => handleStartGame('b')} />
        </div>
      )}
    </main>
  )
}

export default App