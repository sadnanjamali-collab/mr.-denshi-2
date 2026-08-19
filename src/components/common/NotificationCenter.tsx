import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bell, 
  X, 
  Check, 
  Plane, 
  Flame, 
  Radio, 
  ShieldCheck, 
  AlertTriangle, 
  MessageSquare,
  Clock,
  Sparkles
} from 'lucide-react';

export const NotificationCenter: React.FC = () => {
  const { 
    notifications, 
    unreadNotificationsCount, 
    markNotificationRead, 
    markAllNotificationsRead, 
    isNotificationsOpen, 
    setIsNotificationsOpen,
    setIsOrderTrackerOpen,
    setIsLiveCommerceOpen,
    setIsWishlistOpen,
    setActiveBuyerTab
  } = useApp();

  if (!isNotificationsOpen) return null;

  const handleNotificationClick = (notif: any) => {
    markNotificationRead(notif.id);
    if (notif.type === 'ORDER_UPDATE') {
      setIsNotificationsOpen(false);
      setIsOrderTrackerOpen(true);
    } else if (notif.type === 'LIVE_ALERT') {
      setIsNotificationsOpen(false);
      setActiveBuyerTab('LIVE');
    } else if (notif.type === 'PRICE_DROP') {
      setIsNotificationsOpen(false);
      setActiveBuyerTab('WISHLIST');
    } else if (notif.type === 'WARRANTY_REMINDER') {
      setIsNotificationsOpen(false);
      setActiveBuyerTab('PROFILE');
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'ORDER_UPDATE':
        return <Plane className="w-4 h-4 text-cyan-400" />;
      case 'PRICE_DROP':
        return <Flame className="w-4 h-4 text-amber-400" />;
      case 'LIVE_ALERT':
        return <Radio className="w-4 h-4 text-red-400 animate-pulse" />;
      case 'WARRANTY_REMINDER':
        return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
      default:
        return <Bell className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-sm bg-[#131921] border-l border-slate-700 h-full shadow-2xl flex flex-col text-white animate-slideLeft">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-slate-800 text-[#ffd814]">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Notifications Center</h3>
              <p className="text-[10px] text-slate-400 font-mono">
                {unreadNotificationsCount} Unread Telemetry & Deals
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {unreadNotificationsCount > 0 && (
              <button
                onClick={markAllNotificationsRead}
                className="text-[11px] font-mono text-[#febd69] hover:underline"
              >
                Mark all read
              </button>
            )}
            <button
              onClick={() => setIsNotificationsOpen(false)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
          {notifications.length === 0 ? (
            <div className="text-center py-16 text-slate-500 text-xs">
              No notifications yet.
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => handleNotificationClick(notif)}
                className={`p-3 rounded-xl border transition-all cursor-pointer text-xs space-y-1.5 ${
                  notif.isRead
                    ? 'bg-slate-900/60 border-slate-800/80 text-slate-300'
                    : 'bg-slate-900 border-[#febd69]/40 text-white shadow-md'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 font-bold">
                    {getIcon(notif.type)}
                    <span className="line-clamp-1">{notif.title}</span>
                  </div>
                  {!notif.isRead && (
                    <span className="w-2 h-2 rounded-full bg-[#ffd814] shrink-0"></span>
                  )}
                </div>

                <p className="text-[11px] text-slate-300 leading-relaxed pl-6">
                  {notif.message}
                </p>

                <div className="flex items-center justify-between pt-1 pl-6 text-[10px] text-slate-500 font-mono">
                  <span>{notif.timestamp}</span>
                  <span className="text-[#febd69] font-bold">View details →</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
