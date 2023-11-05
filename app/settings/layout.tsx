"use client";

import {
  UserCircleIcon,
  EnvelopeIcon,
  KeyIcon,
  ArrowLeftOnRectangleIcon,
  ArchiveBoxArrowDownIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import Link from "next/link";
import useStore from "store";

const subNavigation = [
  {
    name: "プロフィール",
    icon: UserCircleIcon,
    href: "/settings/profile",
    admin: false,
  },
  {
    name: "メールアドレス",
    icon: EnvelopeIcon,
    href: "/settings/email",
    admin: false,
  },
  {
    name: "パスワード",
    icon: KeyIcon,
    href: "/settings/password",
    admin: false,
  },
  {
    name: "ログアウト",
    icon: ArrowLeftOnRectangleIcon,
    href: "/settings/logout",
    admin: false,
  },
  {
    name: "登録",
    icon: ArchiveBoxArrowDownIcon,
    href: "/settings/register",
    admin: true,
  },
];

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { user } = useStore();

  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="col-span-1 text-sm space-y-1 font-bold flex flex-col max-w-sm md:px-10">
        {subNavigation.map((item, index) =>
          (item.admin && user.is_admin) || !item.admin ? (
            <Link href={item.href} key={index}>
              <div
                className={`${
                  item.href == pathname && "bg-sky-100 text-sky-500"
                } hover:bg-sky-100 px-3 py-2 rounded-full`}
              >
                <item.icon className="inline-block w-5 h-5 mr-3" />
                {item.name}
              </div>
            </Link>
          ) : null
        )}
      </div>
      <div className="col-span-2 max-w-lg px-10">{children}</div>
    </div>
  );
};

export default SettingsLayout;
