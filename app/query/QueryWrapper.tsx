"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useEffect, useState } from "react"

const queryClient = new QueryClient()

export default function QueryWrapper({
  children,
}: {
  children?: React.ReactNode
}) {
  const [showButton, setShowButton] = useState(false)
  //при первом рендере компонента
  useEffect(() => {
    //создаем обработчик
    function handleScroll() {
      //получаем данные из бразузера
      //положение на странице по вертикали
      const scrollPosition = window.scrollY
      //размеры vp по высоте
      const viewportHeight = window.innerHeight
      //если прокручено больше чем высота окна меняем видимость кнопки
      if (scrollPosition > viewportHeight) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    }
    //добавляем обработчик на прокрутку
    window.addEventListener("scroll", handleScroll)
    //при ненадобности компонента удаляем обработчик
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  //обработчик нажатия кнопки для прокрутки на самый верх окна
  function handleScrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <button
        className={`fixed bottom-0 right-0 p-4 ${
          showButton ? "block" : "hidden"
        } bg-teal-600 rounded-xl mx-6 my-5 text-white text-sm transition-all duration-1000`}
        onClick={handleScrollToTop}
      >
        UP
      </button>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
