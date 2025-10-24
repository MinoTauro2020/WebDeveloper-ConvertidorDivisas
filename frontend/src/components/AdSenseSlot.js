import React, { useEffect } from 'react';

const AdSenseSlot = ({ slot = 'top' }) => {
  useEffect(() => {
    // Cargar script de AdSense
    const adsenseId = process.env.REACT_APP_ADSENSE_CLIENT || 'ca-pub-5914722248817610';
    if (adsenseId && adsenseId !== 'ca-pub-XXXXXXXXXXXXXXXX') {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error('AdSense error:', e);
      }
    }
  }, []);

  const adsenseId = process.env.REACT_APP_ADSENSE_CLIENT || 'ca-pub-5914722248817610';
  const isConfigured = adsenseId && adsenseId !== 'ca-pub-XXXXXXXXXXXXXXXX';

  // Configuración de slots por posición
  const slotConfig = {
    top: {
      name: 'Espacio Superior',
      format: 'auto',
      style: { minHeight: '90px' }
    },
    middle: {
      name: 'Espacio Central',
      format: 'auto',
      style: { minHeight: '250px' }
    },
    bottom: {
      name: 'Espacio Inferior',
      format: 'auto',
      style: { minHeight: '90px' }
    },
    sidebar: {
      name: 'Sidebar',
      format: 'vertical',
      style: { minHeight: '600px' }
    }
  };

  const config = slotConfig[slot] || slotConfig.top;

  if (!isConfigured) {
    // Mostrar placeholder cuando AdSense no está configurado
    return (
      <div 
        className="adsense-placeholder rounded-lg" 
        style={config.style}
        data-testid={`adsense-placeholder-${slot}`}
      >
        <div className="text-center">
          <div className="text-2xl mb-2">📊</div>
          <div>Espacio Publicitario AdSense</div>
          <div className="text-sm mt-1">({config.name})</div>
        </div>
      </div>
    );
  }

  return (
    <div className="adsense-container" data-testid={`adsense-slot-${slot}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...config.style }}
        data-ad-client={adsenseId}
        data-ad-slot="1234567890"
        data-ad-format={config.format}
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdSenseSlot;