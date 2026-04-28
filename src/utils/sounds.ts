function ctx(): AudioContext {
  return new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
}

function tone(
  ac: AudioContext,
  freq: number,
  startTime: number,
  duration: number,
  volume = 0.4,
  type: OscillatorType = 'sine',
) {
  const osc = ac.createOscillator()
  const gain = ac.createGain()
  osc.connect(gain)
  gain.connect(ac.destination)
  osc.type = type
  osc.frequency.setValueAtTime(freq, startTime)
  gain.gain.setValueAtTime(volume, startTime)
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration)
  osc.start(startTime)
  osc.stop(startTime + duration)
}

export function playBuzz() {
  const ac = ctx()
  const t = ac.currentTime
  // 딩동 두 음
  tone(ac, 880, t, 0.18, 0.4)
  tone(ac, 660, t + 0.18, 0.22, 0.35)
}

export function playCorrect() {
  const ac = ctx()
  const t = ac.currentTime
  // 올라가는 세 음 + 마지막 길게
  tone(ac, 523, t, 0.12, 0.4)
  tone(ac, 659, t + 0.1, 0.12, 0.4)
  tone(ac, 784, t + 0.2, 0.12, 0.4)
  tone(ac, 1047, t + 0.32, 0.5, 0.45)
}

export function playWrong() {
  const ac = ctx()
  const t = ac.currentTime
  // 내려가는 짧은 이중 부저
  tone(ac, 320, t, 0.15, 0.4, 'square')
  tone(ac, 220, t + 0.15, 0.25, 0.35, 'square')
}

export function playHint() {
  const ac = ctx()
  const t = ac.currentTime
  // 부드러운 알림음
  tone(ac, 740, t, 0.15, 0.25)
  tone(ac, 587, t + 0.15, 0.2, 0.2)
}

export function playNextRound() {
  const ac = ctx()
  const t = ac.currentTime
  // 라운드 시작 팡파레
  tone(ac, 523, t, 0.1, 0.35)
  tone(ac, 659, t + 0.1, 0.1, 0.35)
  tone(ac, 784, t + 0.2, 0.1, 0.35)
  tone(ac, 1047, t + 0.3, 0.1, 0.35)
  tone(ac, 1319, t + 0.4, 0.4, 0.4)
}
