"use client"

import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

export function NavMain({
  items
}) {
  return (
    <SidebarGroup className="bg-white/5 backdrop-blur-md rounded-lg p-2">
      <SidebarGroupLabel className="text-gray-200 font-semibold">Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <motion.div
                  className="flex items-center w-full bg-white/10 rounded-md p-2 hover:bg-white/20 transition-colors"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon className="text-black" />}
                    <span className="text-black ml-2">{item.title}</span>
                    {/* <ChevronRight
                      className="ml-auto text-gray-300 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                    /> */}
                  </SidebarMenuButton>
                </motion.div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <AnimatePresence>
                  <SidebarMenuSub className="pl-4">
                    {item.items?.map((subItem) => (
                      <motion.div
                        key={subItem.title}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url} className="text-gray-200 hover:text-white">
                          {subItem.icon && <subItem.icon className="text-black" />}
                              <span>{subItem.title}</span>
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
    </SidebarGroup>
  );
}