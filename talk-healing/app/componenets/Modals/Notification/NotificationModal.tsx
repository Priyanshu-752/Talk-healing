import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IconBell, IconMenu2, IconX } from '@tabler/icons-react';

export default function NotificationModal({ }) {
    return (
        <DropdownMenu>
  <DropdownMenuTrigger><IconBell size={24} /></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>@John Doe message to you</DropdownMenuItem>
    <DropdownMenuItem>@John Doe message to you</DropdownMenuItem>
    <DropdownMenuItem>@John Doe message to you</DropdownMenuItem>
    <DropdownMenuItem>@John Doe message to you</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
    );
};