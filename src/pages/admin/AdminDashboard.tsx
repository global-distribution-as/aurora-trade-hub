import { useState } from "react";
import { useTranslation } from "react-i18next";
import PortalLayout from "@/components/PortalLayout";
import StatCard from "@/components/StatCard";
import { LayoutDashboard, Users, UserCheck, Package, ShoppingCart, Warehouse, Settings } from "lucide-react";

interface Inquiry {
  id: string;
  buyer_name: string;
  company: string;
  contact: string;
  message: string;
  status: 'new' | 'read' | 'replied';
}

interface PendingProduct {
  id: string;
  name: string;
  category: string;
  price_range: string;
}

const MOCK_INQUIRIES: Inquiry[] = [
  { id: 'IQ01', buyer_name: 'Wei Zhang', company: 'Shanghai Sport Trade Co.', contact: 'weizhang_sport', message: 'Interested in bulk order of Beta AR Jacket, 300 units M/L. Please send quote.', status: 'new' },
  { id: 'IQ02', buyer_name: 'Min-jun Lee', company: 'Seoul Active Wear', contact: 'seoulactive@kr.com', message: 'Can you confirm availability of Atom LT Hoody for Q3?', status: 'read' },
  { id: 'IQ03', buyer_name: 'Arun Tanaka', company: 'Tokyo Outdoor Ltd.', contact: 'tokyo_outd', message: 'Following up on Alpha SV pre-order pricing for 100 units.', status: 'replied' },
];

const MOCK_PENDING: PendingProduct[] = [
  { id: 'PP01', name: 'Norrøna Falketind Jacket', category: 'Jackets', price_range: '$180–$210' },
  { id: 'PP02', name: 'Bergans Trollveggen Fleece', category: 'Fleece', price_range: '$90–$120' },
  { id: 'PP03', name: 'Helly Hansen Odin Softshell', category: 'Softshell', price_range: '$140–$160' },
];

const navItems = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: 'Suppliers', path: '/admin/suppliers', icon: <Users className="h-4 w-4" /> },
  { label: 'Buyers', path: '/admin/buyers', icon: <UserCheck className="h-4 w-4" /> },
  { label: 'Products', path: '/admin/products', icon: <Package className="h-4 w-4" /> },
  { label: 'Orders', path: '/admin/orders', icon: <ShoppingCart className="h-4 w-4" /> },
  { label: 'Inventory', path: '/admin/inventory', icon: <Warehouse className="h-4 w-4" /> },
  { label: 'Settings', path: '/admin/settings', icon: <Settings className="h-4 w-4" /> },
];

export { navItems as adminNavItems };

const statusColors: Record<string, string> = {
  new: 'text-status-blue bg-status-blue/10',
  read: 'text-status-amber bg-status-amber/10',
  replied: 'text-status-green bg-status-green/10',
};

const AdminDashboard = () => {
  const { t } = useTranslation();
  const [inquiries, setInquiries] = useState<Inquiry[]>(MOCK_INQUIRIES);
  const [pendingProducts, setPendingProducts] = useState<PendingProduct[]>(MOCK_PENDING);
  const loading = false;

  const updateInquiryStatus = (id: string, status: 'read' | 'replied') => {
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));
  };

  const approveProduct = (id: string) => {
    setPendingProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <PortalLayout navItems={navItems} portalName="Admin Portal" variant="admin">
      <div className="space-y-6">
        <h1 className="text-xl font-bold text-foreground">{t('admin_dashboard')}</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <StatCard label={t('total_suppliers')} value={8} />
          <StatCard label={t('total_buyers')} value={23} />
          <StatCard label={t('active_orders')} value={11} />
          <StatCard label={t('pending_quotes')} value={6} />
          <StatCard label={t('products')} value={124} />
          <StatCard label={t('orders_this_month')} value={14} />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Inquiries */}
          <div className="bg-card rounded-xl border border-border">
            <div className="p-4 border-b border-border">
              <h2 className="font-semibold text-foreground text-sm">{t('inquiries')}</h2>
            </div>
            {loading ? (
              <div className="p-4 space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-10 bg-surface-elevated rounded animate-pulse" />
                ))}
              </div>
            ) : inquiries.length === 0 ? (
              <p className="p-4 text-sm text-muted-foreground">{t('no_inquiries')}</p>
            ) : (
              <div className="divide-y divide-border">
                {inquiries.map((q) => (
                  <div key={q.id} className="p-3 hover:bg-white/[0.02] transition-colors">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div>
                        <p className="font-medium text-foreground text-sm">{q.buyer_name}</p>
                        <p className="text-muted-foreground text-xs">{q.company} · {q.contact}</p>
                      </div>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide shrink-0 ${statusColors[q.status]}`}>
                        {q.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate mb-2">{q.message}</p>
                    <div className="flex gap-2">
                      {q.status === 'new' && (
                        <button
                          onClick={() => updateInquiryStatus(q.id, 'read')}
                          className="text-[11px] text-primary hover:text-primary/80 font-medium transition-colors"
                        >
                          {t('mark_as_read')}
                        </button>
                      )}
                      {q.status !== 'replied' && (
                        <button
                          onClick={() => updateInquiryStatus(q.id, 'replied')}
                          className="text-[11px] text-status-green hover:text-status-green/80 font-medium transition-colors"
                        >
                          {t('mark_as_replied')}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pending Products */}
          <div className="bg-card rounded-xl border border-border">
            <div className="p-4 border-b border-border">
              <h2 className="font-semibold text-foreground text-sm">{t('pending_supplier_uploads')}</h2>
            </div>
            {loading ? (
              <div className="p-4 space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-10 bg-surface-elevated rounded animate-pulse" />
                ))}
              </div>
            ) : pendingProducts.length === 0 ? (
              <p className="p-4 text-sm text-muted-foreground">{t('no_pending_uploads')}</p>
            ) : (
              <div className="divide-y divide-border">
                {pendingProducts.map((p) => (
                  <div key={p.id} className="p-3 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                    <div>
                      <p className="font-medium text-foreground text-sm">{p.name}</p>
                      <p className="text-muted-foreground text-xs">{p.category} · {p.price_range}</p>
                    </div>
                    <button
                      onClick={() => approveProduct(p.id)}
                      className="text-[11px] text-status-green hover:text-status-green/80 font-semibold transition-colors shrink-0"
                    >
                      {t('approve')}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default AdminDashboard;
