import { useState } from "react";
import { useTranslation } from "react-i18next";
import PortalLayout from "@/components/PortalLayout";
import { LayoutDashboard, Package, Upload, ShoppingCart, User } from "lucide-react";

interface FormState {
  name: string;
  description: string;
  category: string;
  price_range: string;
}

const empty: FormState = { name: '', description: '', category: '', price_range: '' };

const categories = ['Jackets', 'Insulation', 'Softshell', 'Down', 'Fleece', 'Running'];

const navItems = [
  { label: 'Dashboard', path: '/supplier/dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: 'My Products', path: '/supplier/products', icon: <Package className="h-4 w-4" /> },
  { label: 'Upload Price List', path: '/supplier/upload', icon: <Upload className="h-4 w-4" /> },
  { label: 'Orders', path: '/supplier/orders', icon: <ShoppingCart className="h-4 w-4" /> },
  { label: 'Profile', path: '/supplier/profile', icon: <User className="h-4 w-4" /> },
];

const SupplierUpload = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState<FormState>(empty);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setTimeout(() => {
      setSuccess(true);
      setForm(empty);
      setSubmitting(false);
    }, 600);
  };

  return (
    <PortalLayout navItems={navItems} portalName="Supplier Portal">
      <div className="space-y-6">
        <h1 className="text-xl font-bold text-foreground">{t('submit_product')}</h1>

        <div className="bg-card rounded-xl border border-border p-6">
          <p className="text-sm text-muted-foreground mb-6">{t('products_reviewed')}</p>

          {success ? (
            <div className="rounded-xl border border-status-green/30 bg-status-green/10 p-6 text-center space-y-2">
              <p className="text-status-green font-semibold">{t('product_submitted')}</p>
              <p className="text-sm text-muted-foreground">{t('admin_will_approve')}</p>
              <button
                onClick={() => setSuccess(false)}
                className="mt-2 text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
              >
                {t('submit_another')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t('product_name')}</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder={t('product_name_placeholder')}
                    className="w-full px-3 py-2.5 border border-border rounded-lg text-sm bg-input text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t('category')}</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 border border-border rounded-lg text-sm bg-input text-foreground focus:border-primary focus:outline-none transition-colors"
                  >
                    <option value="">{t('select_category')}</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t('price_range_usd')}</label>
                <input
                  name="price_range"
                  value={form.price_range}
                  onChange={handleChange}
                  required
                  placeholder={t('price_range_placeholder')}
                  className="w-full px-3 py-2.5 border border-border rounded-lg text-sm bg-input text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t('description')}</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder={t('description_placeholder')}
                  className="w-full px-3 py-2.5 border border-border rounded-lg text-sm bg-input text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none transition-colors resize-none"
                />
              </div>

              {error && (
                <p className="text-sm text-status-red">{t('failed_to_submit')} {error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2.5 bg-accent text-accent-foreground font-medium rounded-lg text-sm hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150"
              >
                {submitting ? t('submitting') : t('submit_for_review')}
              </button>
            </form>
          )}
        </div>
      </div>
    </PortalLayout>
  );
};

export default SupplierUpload;
