import { Outlet } from 'react-router-dom'
import SettingLeftSidebar from '../../components/shared/settingLeftsidebar'

export default function SettingsPage() {
  return (
    <div className="flex ">
        <SettingLeftSidebar  />
        <main className="w-full  z-10 p-2">
          <Outlet />
        </main>
    </div>
  )
}
