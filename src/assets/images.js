// Image paths for local assets
// Place actual image files in public/assets/ directory
const asset = (fileName) => `${import.meta.env.BASE_URL}assets/${fileName}`;

export const images = {
  // Favicon - logo transparent no text
  logoTransparentNoText: asset('logotransparent_notext.png'),
  
  // NavBar - TransWestern Capital Advisors logo
  logoTransparentCapitalAdvisors: asset('logotransparen_capital_advisors.png'),
  
  // Background/HomePage - Capital Advisors logo  
  logoTransparentCapitalAdvisorsBg: asset('logotransparen_capital_advisors.png'),
  
  // Footer - Capital Advisors logo
  logoTransparentCapitalAdvisorsFooter: asset('logotransparen_capital_advisors.png'),
  
  // Bridge - Bridge logo
  logoTransparentBridge: asset('logotransparent_bridge.png'),
  
  // Bank icon for services hub
  logoBankTransparentNoOutline: asset('logo_bank_transparent_nooutline.png'),
  
  // Team member photo
  arielNewport: asset('ariel-newport.jpg')
};

export const externalImages = {
  providenceJournal: 'https://www.providencejournal.com/gcdn/presto/2022/01/07/NNDN/4614c20a-edf2-4516-982a-efdabad0cf24-your_photos_december_12.jpeg?width=600&height=450&fit=crop&format=pjpg&auto=webp',
  newportBridge: 'https://a4arch.com/wp-content/uploads/2021/07/Newport-Bridge-1080x675.jpg',
  oceanWaves: 'https://img.peapix.com/9586146341774312341_480.jpg'
};