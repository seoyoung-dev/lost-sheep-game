import GameScreen from './pages/GameScreen'
import SlideAssets from './pages/SlideAssets'

export default function App() {
  if (new URLSearchParams(window.location.search).get('slides') !== null) {
    return <SlideAssets />
  }
  return <GameScreen />
}
