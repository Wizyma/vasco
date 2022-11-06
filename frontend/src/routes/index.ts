import { MenuProps } from "../components/Menu";

export const menus: MenuProps['items'] = {
  home: {
    icon: 'SettingsIcon',
    placeholder: 'Home',
    title: 'Home',
    children: {
      yearly: {
        label: 'Yearly Revenue'
      },
      monthly: {
        label: 'Monthly Revenue'
      },
      daily: {
        label: 'Daily Revenue'
      }
    }
  },
  profile: {
    icon: 'ViewIcon',
    placeholder: 'Profile',
    title: 'Profile',
    children: {
      informations: {
        label: 'Personal Information',
      }
    }
  }
} 