import React, { useEffect, useRef, useState } from 'react'
import cls from './Text.module.scss'
import { createText } from '@/logics/creatingText.js'
import { useDispatch, useSelector } from 'react-redux'
import { toggleStart } from '@/store.js'

const ignoringTexts = [
  'Tab',
  'Delete',
  'Escape'
]

function Text()  {
  const { start, settings, length } = useSelector(state => state.slice)
  const dispatch = useDispatch()
  const [text, setText] = useState([])
  const [time, setTime] = useState(0)
  const [current, setCurrent] = useState(0)
  const [writed, setWrited] = useState('')
  const input = useRef(null)
  const [onFocus, setOnFocus] = useState(false)
  const timeout = useRef(null)

  useEffect(() => {
    setText(createText(settings, length))
    clearStates()
  }, [settings])

  useEffect(() => {
    if (!Object.values(settings).includes(true)) {
      if (onFocus) {
        setOnFocus(false)
      }
    }
  }, [onFocus])

  function elClass(t, i) {
    if (i === writed.length) return `${cls.placeholder} ${cls.active}`
    if (writed.length < i) return cls.placeholder

    if (i === writed.length - 1) {
      if (t === writed[i]) return `${cls.writed} ${cls.active} ${cls.gone}`
      else return `${cls.error} ${cls.active} ${cls.gone}`
    }
    if (t === writed[i]) return cls.writed
    else return cls.error
  }

  function clearStates() {
    setWrited('')
    setCurrent(0)
    setTime(0)
  }
  // Select at least one parameter

  return (
    <div
      className={cls.text}
      onClick={() => Object.values(settings).includes(true) ? input.current.focus() : null}>
      <div className={`${cls.notFocused} ${!onFocus ? cls.active : ''}`}>{Object.values(settings).includes(true) ? 'Click here to start typing' : 'Select at least one parameter'}</div>
      <input
        ref={input}
        onFocus={() => setOnFocus(true)}
        onBlur={() => setOnFocus(false)}
        onInput={(e) => setWrited(e.target.value)}
        value={writed}
        type="text"
        className={cls.input}
      />
      <p className={`${cls.placeholder} ${!onFocus ? cls.textBlur : ''}`}>
        {
          text.map((t, i) => (
            <span
              className={elClass(t, i)}
              key={i}
            >
              {t}
            </span>
          ))
        }
      </p>
      {time ? <p className={cls.time}>{time}</p> : null}
    </div>
  );
};

export default Text;
