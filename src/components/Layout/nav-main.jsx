"use client"

import { useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

/* ─────────────────────────────────────────────────────────────
   Hook: enable click‑and‑drag horizontal scrolling
   ───────────────────────────────────────────────────────────── */
function useDragScroll(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    let isDown = false
    let startX = 0
    let scrollLeft = 0

    const onPointerDown = (e) => {
      isDown = true
      el.classList.add("cursor-grabbing")
      startX = e.pageX - el.offsetLeft
      scrollLeft = el.scrollLeft
      el.setPointerCapture(e.pointerId)
    }

    const onPointerMove = (e) => {
      if (!isDown) return
      const x = e.pageX - el.offsetLeft
      const walk = x - startX
      el.scrollLeft = scrollLeft - walk
    }

    const onPointerUp = (e) => {
      isDown = false
      el.classList.remove("cursor-grabbing")
      el.releasePointerCapture(e.pointerId)
    }

    el.addEventListener("pointerdown", onPointerDown)
    el.addEventListener("pointermove", onPointerMove)
    el.addEventListener("pointerup", onPointerUp)
    el.addEventListener("pointerleave", onPointerUp)

    return () => {
      el.removeEventListener("pointerdown", onPointerDown)
      el.removeEventListener("pointermove", onPointerMove)
      el.removeEventListener("pointerup", onPointerUp)
      el.removeEventListener("pointerleave", onPointerUp)
    }
  }, [ref])
}

/* ─────────────────────────────────────────────────────────────
   NavMain component (JSX)
   ───────────────────────────────────────────────────────────── */
export function NavMain({ items, tools = [] }) {
  const firstSix = items.slice(0, 6)
  const secondSix = items.slice(5, 11)
  const toolsRef = useRef(null)
  useDragScroll(toolsRef)

  return (
    <SidebarGroup className="rounded-lg p-2 backdrop-blur-md">
      {/* platform section */}
      <SidebarGroupLabel className="font-semibold ">
        Platform
      </SidebarGroupLabel>

      <SidebarMenu className={'bg-white rounded-2xl'}>
        {firstSix.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex w-full items-center p-2 transition-colors ${
                    item.isActive
                      ? "rounded-2xl bg-indigo-600 text-white"
                      : "bg-white/10 text-black hover:bg-white/20"
                  }`}
                >
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon className="text-black" />}
                    <span className="ml-2">{item.title}</span>
                  </SidebarMenuButton>
                </motion.div>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <AnimatePresence>
                  <SidebarMenuSub className="space-y-1 pl-4">
                    {item.items?.map((sub) => (
                      <motion.div
                        key={sub.title}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                      >
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton asChild>
                            <a
                              href={sub.url}
                              className={`flex w-full items-center rounded-md p-2 text-gray-200 transition-colors ${
                                sub.isActive
                                  ? "bg-indigo-600 text-white"
                                  : "hover:bg-indigo-500 hover:text-white"
                              }`}
                            >
                              {sub.icon && (
                                <sub.icon className="mr-2 text-black" />
                              )}
                              <span className="flex-1">{sub.title}</span>
                              {sub.badge && (
                                <span className="ml-2 rounded-full bg-red-500 px-2 py-1 text-xs text-white">
                                  {sub.badge}
                                </span>
                              )}
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      </motion.div>
                    ))}
                  </SidebarMenuSub>
                </AnimatePresence>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>

      {/* flat list view of same 6 items */}
      <div className="mt-4 flex flex-col gap-5 rounded-2xl bg-gray-200 p-5">
        {secondSix.map((item) => (
          <div key={item.title} className="flex items-center gap-2">
            {item.icon && <item.icon  className="text-black size-4" />}
            <span className="ml-2">{item.title}</span>
          </div>
        ))}
      </div>

      {/* Tools bar: horizontal scroll + mouse drag */}
      {tools.length > 0 && (
        <>
          <SidebarGroupLabel className="mt-6 text-xs font-semibold uppercase tracking-wide text-gray-400">
            Tools
          </SidebarGroupLabel>

          <div
            ref={toolsRef}
            className="mt-2 flex gap-2 overflow-x-auto pb-2 cursor-grab select-none"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {tools.map((tool) => (
              <button
                key={tool.title}
                className="flex-shrink-0 flex items-center gap-1 rounded-lg bg-white/10 px-3 py-2 text-sm text-black hover:bg-white/20"
              >
                {tool.icon && <tool.icon className="size-4" />}
                {tool.title}
              </button>
            ))}
          </div>
        </>
      )}
    </SidebarGroup>
  )
}
