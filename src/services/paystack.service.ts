import { APP_CONFIG } from '../config/constants';

declare global {
  interface Window {
    PaystackPop: any;
  }
}

export interface PaystackConfig {
  key: string;
  email: string;
  amount: number;
  currency?: string;
  ref?: string;
  callback: (response: any) => void;
  onClose?: () => void;
}

class PaystackService {
  private loadScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (window.PaystackPop) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Paystack script'));
      document.head.appendChild(script);
    });
  }

  async initializePayment(config: PaystackConfig): Promise<void> {
    await this.loadScript();
    
    const handler = window.PaystackPop.setup({
      key: APP_CONFIG.PAYSTACK_PUBLIC_KEY,
      email: config.email,
      amount: config.amount * 100, // Convert to kobo
      currency: config.currency || 'NGN',
      ref: config.ref || this.generateReference(),
      callback: config.callback,
      onClose: config.onClose || (() => {}),
    });

    handler.openIframe();
  }

  generateReference(): string {
    return `ref_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  async verifyTransaction(reference: string): Promise<any> {
    // This should be done on the backend for security
    // Frontend verification is not recommended for production
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${APP_CONFIG.PAYSTACK_SECRET_KEY}`,
      },
    });
    return response.json();
  }
}

export default new PaystackService();