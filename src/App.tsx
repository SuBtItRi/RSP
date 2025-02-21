import { SetStateAction, useEffect, useRef, useState } from 'react'
import './App.scss'

const knb: Record<string, JSX.element> = {
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
  const [countGame, setCountGame] = useState<number>(localStorage.getItem('countGame'))
  const [winCount, setWinCount] = useState<number>(localStorage.getItem('winCount'))
  const [loseCount, setLoseCount] = useState<number>(localStorage.getItem('loseCount'))
  const [drawCount, setDrawCount] = useState<number>(localStorage.getItem('drawCount'))

  const handleStartGame = (choice: SetStateAction<string | undefined>) => {
    setCountGame((count) => ++count)
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
    const choiceToStr = `${userChoice}${botChoice}`
    setResult(WinLoseDraw[choiceToStr])
    resultRef.current.className = 'result'
    resultRef.current.classList.add(WLDClasses[choiceToStr])
    switch (result) {
      case 'You Win':
        return setWinCount((count) => ++count)
      case 'You Lose':
        return setLoseCount((count) => ++count)
      case 'Draw':
        return setDrawCount((count) => ++count)
    }
  }, [userChoice])

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
        {userChoice &&
          <>{knb[botChoice]}</>
        }
      </div>
      <h3>Ваш выбор</h3>
      {userChoice ?
        <>
          <div>{knb[userChoice]}</div>
          <div className="restart_container">
            <button className='restart' onClick={handleRestart}>Restart</button>
          </div>
        </>
        :
        <div className="choice">
          <img src="k.png" alt="" style={{ width: 75 }} onClick={() => handleStartGame('k')} />
          <img src="n.png" alt="" style={{ width: 75 }} onClick={() => handleStartGame('n')} />
          <img src="b.png" alt="" style={{ width: 75 }} onClick={() => handleStartGame('b')} />
        </div>
      }
    </main>
  )
}

export default App
