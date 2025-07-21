'use client';

import { useRef, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import {
  User,
  Check,
  DollarSign,
  Users,
  Building,
  Settings,
  User2,
  Home,
  Zap,
  Settings2,
} from 'lucide-react';
import Link from 'next/link';

function useDragScroll(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onPointerDown = (e) => {
      isDown = true;
      el.classList.add('cursor-grabbing');
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e) => {
      if (!isDown) return;
      const x = e.pageX - el.offsetLeft;
      const walk = x - startX;
      el.scrollLeft = scrollLeft - walk;
    };

    const onPointerUp = (e) => {
      isDown = false;
      el.classList.remove('cursor-grabbing');
      el.releasePointerCapture(e.pointerId);
    };

    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerup', onPointerUp);
    el.addEventListener('pointerleave', onPointerUp);

    return () => {
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', onPointerUp);
      el.removeEventListener('pointerleave', onPointerUp);
    };
  }, [ref]);
}

export function NavMain({ items, tools = [] }) {
  const toolsRef = useRef(null);
  const pathname = usePathname() || '/'; // Fallback to '/' if pathname is undefined
  const [openCollapsibles, setOpenCollapsibles] = useState({});

  useDragScroll(toolsRef);

  // Toggle collapsible state
  const toggleCollapsible = (title) => {
    setOpenCollapsibles((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  // Auto-open collapsible if a sub-item is active
  useEffect(() => {
    const updatedOpenCollapsibles = {};
    items.forEach((item) => {
      if (item.items?.some((sub) => sub.url === pathname)) {
        updatedOpenCollapsibles[item.title] = true;
      } else {
        updatedOpenCollapsibles[item.title] = openCollapsibles[item.title] || false;
      }
    });
    setOpenCollapsibles(updatedOpenCollapsibles);
  }, [pathname, items]);

  return (
  <>
      <SidebarGroup className="rounded-lg p-2 backdrop-blur-md h-full flex flex-col">
      {/* Platform Section */}
      <SidebarGroupLabel className="font-semibold text-indigo-800 mb-4">
        Platform
      </SidebarGroupLabel>

      <SidebarMenu className="rounded-2xl flex-1">
        {items.map((item) => {
          const isActive = item.url === pathname || item.items?.some((sub) => sub.url === pathname);

          return (
            <Collapsible
              key={item.title}
              open={openCollapsibles[item.title] || isActive}
              onOpenChange={() => toggleCollapsible(item.title)}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex w-full items-center p-2 transition-all duration-200 rounded-2xl ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'text-black hover:bg-indigo-100 hover:shadow-sm'
                    }`}
                  >
                    <Button
                      variant="ghost"
                      className={`flex w-full items-center justify-start hover:bg-transparent p-0 ${
                        isActive ? 'text-white' : 'text-black hover:bg-transparent'
                      }`}
                      asChild={!!item.url}
                    >
                      {item.url ? (
                        <Link href={item.url}>
                          {item.icon && (
                            <item.icon
                              className={`h-5 w-5 mr-2 ${isActive ? 'text-white' : 'text-black'}`}
                            />
                          )}
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      ) : (
                        <>
                          {item.icon && (
                            <item.icon
                              className={`h-5 w-5 mr-2 ${isActive ? 'text-white' : 'text-black'}`}
                            />
                          )}
                          <span className="font-medium">{item.title}</span>
                        </>
                      )}
                    </Button>
                  </motion.div>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <AnimatePresence>
                    {item.items?.length > 0 && (
                      <SidebarMenuSub className="space-y-1 pl-8 mt-2">
                        {item.items.map((sub) => (
                          <motion.div
                            key={sub.title}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2, ease: 'easeInOut' }}
                          >
                            {/* <SidebarMenuSubItem> */}
                              <Button
                                asChild
                                variant="ghost"
                                className={`flex w-fit items-center rounded-lg p-2 px- transition-all duration-200 justify-start ${
                                  sub.url === pathname
                                    ? 'bg-indigo-200 text-white shadow-sm'
                                    : 'text-indigo-700 hover:bg-indigo-100 hover:text-indigo-900'
                                }`}
                              >
                                <Link href={sub.url}>
                                  {sub.icon && (
                                    <sub.icon
                                      className={`mr-2 h-4 w-4 ${
                                        sub.url === pathname ? 'text-white' : 'text-indigo-600'
                                      }`}
                                    />
                                  )}
                                  <span className="flex-1 text-left text-sm">{sub.title}</span>
                                  {sub.badge && (
                                    <span className="ml-2 rounded-full bg-red-500 px-2 py-1 text-xs text-white">
                                      {sub.badge}
                                    </span>
                                  )}
                                </Link>
                              </Button>
                            {/* </SidebarMenuSubItem> */}
                          </motion.div>
                        ))}
                      </SidebarMenuSub>
                    )}
                  </AnimatePresence>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>

      {/* Tools Section */}
    </SidebarGroup>
      {tools.length > 0 && (
        <div className="mt-auto pb-4">
          <SidebarGroupLabel className="mt-4 text-xs font-semibold uppercase tracking-wide text-indigo-600">
            Tools
          </SidebarGroupLabel>
          <div
            ref={toolsRef}
            className="mt-2 grid grid-cols-2 gap-2 overflow-x-auto scrollbar-hide"
          >
            {tools.map((tool) => (
              <motion.div
                key={tool.title}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={tool.url}>
                <Button
                  className="flex items-center gap-2 rounded-lg bg-indigo-100 px-3 py-2 text-sm text-indigo-800 hover:bg-indigo-200 transition-all duration-200 shadow-sm w-full"
                >
                  {tool.icon && <tool.icon className="h-4 w-4 text-indigo-600" />}
                  {tool.title}
                </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}
  </>
  );
}