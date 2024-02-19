'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

import './Header.css';

const components: { title: string; href: string; description: string }[] = [
  {
    title: 'Lehrbetriebe',
    href: '/lehrbetriebe',
    description: "Zeige die Tabelle 'Lehrbetriebe' an.",
  },
  {
    title: 'Lernende',
    href: '/lernende',
    description: "Zeige die Tabelle 'Lernende' an.",
  },
  {
    title: 'Lehrbetriebe ➞ lernende',
    href: '/lehrbetriebe_lernende',
    description:
      'Diese Tabelle zeigt die Zuordnung von Lehrbetrieben zu Lernenden an.',
  },
  {
    title: 'Länder',
    href: '/laender',
    description: "Zeige die Tabelle 'Länder' an.",
  },
  {
    title: 'Dozenten',
    href: '/dozenten',
    description: "Zeige die Tabelle 'Dozenten' an.",
  },
  {
    title: 'Kurse',
    href: '/kurse',
    description: "Zeige die Tabelle 'Kurse' an.",
  },
  {
    title: 'Kurse ➞ lernende',
    href: '/kurse_lernende',
    description:
      'Diese Tabelle zeigt die Zuordnung von Kursen zu Lernenden an.',
  },
];

export function Header() {
  return (
    <div className="header p-3">
      <div className="grid place-content-left">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                href="/"
              >
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Tabellen</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                href="https://github.com/Rfaria06/m294"
              >
                Dokumentation
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                href="#"
                onClick={() => {
                  history.back();
                  return false;
                }}
              >
                Zurück
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

export default Header;
