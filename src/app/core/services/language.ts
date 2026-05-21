import { Injectable, signal } from '@angular/core';

export type Language = 'ka' | 'en';

export interface Translations {
  // Nav
  home: string;
  about: string;
  login: string;
  register: string;
  logout: string;
  cart: string;
  products: string;
  productsSubtitle: string;
  addToCart: string;
  details: string;
  loading: string;
  error: string;
  aboutTitle: string;
  aboutSubtitle: string;
  aboutProducts: string;
  aboutProductsDesc: string;
  aboutDelivery: string;
  aboutDeliveryDesc: string;
  aboutWarranty: string;
  aboutWarrantyDesc: string;
  aboutSupport: string;
  aboutSupportDesc: string;
  aboutContact: string;
  aboutHeadline: string;
  aboutContactText: string;
  aboutContactCta: string;
  contactUs: string;
  cartTitle: string;
  cartEmpty: string;
  cartTotal: string;
  cartCheckout: string;
  cartClear: string;
  cartBack: string;
  cartQuantity: string;
  cartPrice: string;
  cartRemove: string;
  loginTitle: string;
  loginSubtitle: string;
  loginEmail: string;
  loginPassword: string;
  loginBtn: string;
  loginLoading: string;
  loginSwitch: string;
  loginError: string;
  loginEmailError: string;
  loginPasswordError: string;
  registerTitle: string;
  registerSubtitle: string;
  registerFirstName: string;
  registerLastName: string;
  registerAge: string;
  registerGender: string;
  registerGenderMale: string;
  registerGenderFemale: string;
  registerPhone: string;
  registerAddress: string;
  registerZipcode: string;
  registerPassword: string;
  registerConfirmPassword: string;
  registerBtn: string;
  registerLoading: string;
  registerSwitch: string;
  registerError: string;
  footerTagline: string;
  footerNav: string;
  footerContact: string;
  footerCopy: string;
  heroStoreTag: string;
  heroTitle: string;
  heroSubtitle: string;
  heroFastDelivery: string;
  heroSecurePayment: string;
  heroBestQuality: string;
  searchPlaceholder: string;
  allCategories: string;
  sortMostPopular: string;
  sortPriceLow: string;
  sortPriceHigh: string;
  sortHighestDiscount: string;
  clearAll: string;
  resultsFound: string;
  resultsProduct: string;
  noProductsFound: string;
  resetFilters: string;
  viewDetails: string;
  productDetailsTitle: string;
  productDetailsLoading: string;
  backToProducts: string;
  customerRating: string;
  productDescription: string;
  save: string;
  percentOff: string;
  soldOut: string;
  inStock: string;
  addedToCart: string;
  fieldRequired: string;
  minAge: string;
  minPassword: string;
  registerFirstNameRequired: string;
  registerLastNameRequired: string;
  registerPhoneRequired: string;
  registerAddressRequired: string;
  registerZipcodeRequired: string;
  registerPasswordRequired: string;
  registerDescription: string;
  registerSecure: string;
  registerSecureDesc: string;
  registerFast: string;
  registerFastDesc: string;
  createAccount: string;
  registerFormSubtitle: string;
  registerAlreadyHaveAccount: string;
  notFoundTitle: string;
  notFoundMessage: string;
  goHome: string;
  productCardsWorking: string;
  productCategory: string;
  productBrand: string;
  productRating: string;
  productDiscount: string;
  freeShipping: string;
  securePayment: string;
  easyReturns: string;
  productNotFound: string;
  failedToLoadProduct: string;
  ratingOutOf5: string;
  productInformation: string;
  priceFrom: string; // ახალი
  priceTo: string;   // ახალი
}

const ka: Translations = {
  home: 'მთავარი',
  about: 'ჩვენს შესახებ',
  login: 'შესვლა',
  register: 'რეგისტრაცია',
  logout: 'გასვლა',
  cart: 'კალათა',
  products: 'პროდუქტები',
  productsSubtitle: 'აირჩიე შენთვის სასურველი ტექნიკა',
  addToCart: 'კალათაში',
  soldOut: 'მარაგი ამოწურულია',
  inStock: 'მარაგშია',
  details: 'დეტალები',
  loading: '⏳ იტვირთება...',
  error: 'პროდუქტები ვერ ჩაიტვირთა',
  aboutTitle: 'ჩვენს შესახებ',
  aboutSubtitle: 'TechShop — საქართველოს წამყვანი ტექნიკის მაღაზია',
  aboutProducts: 'პროდუქტები',
  aboutProductsDesc:
    'გთავაზობთ უახლეს ლეპტოპებს, სმარტფონებს და სხვა ელექტრონიკას საუკეთესო ფასებად.',
  aboutDelivery: 'მიწოდება',
  aboutDeliveryDesc: 'სწრაფი და საიმედო მიწოდება საქართველოს ნებისმიერ კუთხეში.',
  aboutWarranty: 'გარანტია',
  aboutWarrantyDesc: 'ყველა პროდუქტზე გარანტია და გაყიდვის შემდგომი სერვისი.',
  aboutSupport: 'მხარდაჭერა',
  aboutSupportDesc: '24/7 მომხმარებელთა მხარდაჭერა ნებისმიერი კითხვისთვის.',
  aboutContact: 'დაგვიკავშირდი',
  aboutHeadline: 'TechShop — ტექნოლოგიური ექსკლუზივების მაღაზია',
  aboutContactText: 'Გვსიამოვნებს დაგეხმაროთ შეკვეთების, დაბრუნების ან სხვა კითხვების დროს.',
  aboutContactCta: 'გაგვიგზავნეთ შეტყობინება და ჩვენ მალე მოგხვდებით.',
  contactUs: 'დაგვიკავშირდით',
  cartTitle: '🛒 კალათა',
  cartEmpty: 'კალათა ცარიელია',
  cartTotal: 'სულ',
  cartCheckout: 'შეკვეთა ✅',
  cartClear: 'გასუფთავება 🗑️',
  cartBack: '← პროდუქტებზე დაბრუნება',
  cartQuantity: 'რაოდენობა',
  cartPrice: 'ფასი',
  cartRemove: '🗑️ წაშლა',
  loginTitle: 'შესვლა',
  loginSubtitle: 'გამარჯობა! შედი შენს ანგარიშზე',
  loginEmail: 'მეილი',
  loginPassword: 'პაროლი',
  loginBtn: 'შესვლა',
  loginLoading: 'იტვირთება...',
  loginSwitch: 'ანგარიში არ გაქვს? დარეგისტრირდი',
  loginError: 'არასწორი მეილი ან პაროლი',
  loginEmailError: 'სწორი მეილი შეიყვანეთ',
  loginPasswordError: 'პაროლი სავალდებულოა',
  registerTitle: 'რეგისტრაცია',
  registerSubtitle: 'შექმენი ახალი ანგარიში',
  registerFirstName: 'სახელი',
  registerLastName: 'გვარი',
  registerAge: 'ასაკი',
  registerGender: 'სქესი',
  registerGenderMale: 'მამრობითი',
  registerGenderFemale: 'მდედრობითი',
  registerPhone: 'ტელეფონი',
  registerAddress: 'მისამართი',
  registerZipcode: 'საფოსტო კოდი',
  registerPassword: 'პაროლი',
  registerConfirmPassword: 'პაროლის დადასტურება',
  registerBtn: 'რეგისტრაცია',
  registerLoading: 'იტვირთება...',
  registerSwitch: 'უკვე გაქვს ანგარიში? შესვლა',
  registerError: 'რეგისტრაცია ვერ მოხერხდა',
  registerDescription:
    'ჩაწერე შენი მონაცემები და მიიღე სწრაფი წვდომა TechShop-ის საუკეთესო შეთავაზებებზე.',
  registerSecure: 'უსაფრთხო არჩევანი',
  registerSecureDesc: 'ყველა ტრანზაქცია დაცულია და პირადი ინფორმაცია არ ინახება.',
  registerFast: 'სწრაფი რეგისტრაცია',
  registerFastDesc: 'სამი მარტივი ნაბიჯი წარმატებული ციფრული ანგარიშისთვის.',
  createAccount: 'ანგარიშის შექმნა',
  registerFormSubtitle: 'დაეწყეთ თქვენი სამყარო ახალ ტექნოლოგიასთან ერთად.',
  registerAlreadyHaveAccount: 'უკვე გაქვთ ანგარიში?',
  footerTagline: 'საუკეთესო ტექნიკა საუკეთესო ფასად',
  footerNav: 'ნავიგაცია',
  footerContact: 'კონტაქტი',
  footerCopy: '© 2024 TechShop. ყველა უფლება დაცულია.',
  heroStoreTag: 'პრემიუმ ტექნიკის მაღაზია',
  heroTitle: 'მოგესალმებთ TechShop-ში',
  heroSubtitle: 'აღმოაჩინეთ ხელმისაწვდომი ტექნიკა საუკეთესო ფასებითა და ხარისხის გარანტიით',
  heroFastDelivery: 'სწრაფი მიწოდება',
  heroSecurePayment: 'უსაფრთხო გადახდა',
  heroBestQuality: 'საუკეთესო ხარისხი',
  searchPlaceholder: 'ძებნა პროდუქტების, ბრენდების, კატეგორიების...',
  allCategories: 'ყველა კატეგორია',
  sortMostPopular: 'ყველაზე პოპულარული',
  sortPriceLow: 'ფასი: დაბალიდან მაღალი',
  sortPriceHigh: 'ფასი: მაღალიდან დაბალი',
  sortHighestDiscount: 'უდიდესი ფასდაკლება',
  clearAll: 'ყველას გასუფთავება',
  resultsFound: 'ნაპოვნია',
  resultsProduct: 'პროდუქტი',
  noProductsFound: 'პროდუქტი ვერ მოიძებნა თქვენი კრიტერიუმის მიხედვით',
  resetFilters: 'ფილტრების გადატvirთვა',
  viewDetails: 'დეტალები',
  productDetailsTitle: 'პროდუქტის დეტალები',
  productDetailsLoading: 'პროდუქტის დეტალების ჩატვირთვა...',
  backToProducts: '← პროდუქტებზე დაბრუნება',
  customerRating: 'მომხმარებლის შეფასება',
  productDescription: 'აღწერა',
  save: 'დაფიქრება',
  percentOff: '% ფასდაკლება',
  addedToCart: 'კალათაში დამატებულია!',
  fieldRequired: 'სავალდებულო',
  minAge: 'მინ. 18',
  minPassword: 'მინიმუმ 8 სიმბოლო',
  registerFirstNameRequired: 'სახელი სავალდებულოა',
  registerLastNameRequired: 'გვარი სავალდებულოა',
  registerPhoneRequired: 'ტელეფონი სავალდებულოა',
  registerAddressRequired: 'მისამართი სავალდებულოა',
  registerZipcodeRequired: 'საფოსტო კოდი სავალდებულოა',
  registerPasswordRequired: 'პაროლი მინიმუმ 8 სიმბოლო',
  notFoundTitle: 'გვერდი ვერ მოიძებნა',
  notFoundMessage: 'მოკვდილებული ბუტი: 404',
  goHome: 'მთავარზე დაბრუნება',
  productCardsWorking: 'პროდუქტის კარტა',
  productCategory: 'კატეგორია',
  productBrand: 'ბრენდი',
  productRating: 'შეფასება',
  productDiscount: 'ფასდაკლება',
  freeShipping: 'უფასო მიწოდება',
  securePayment: 'უსაფრთხო გადახდა',
  easyReturns: 'მარტივი დაბრუნება',
  productNotFound: 'პროდუქტი ვერ მოიძებნა',
  failedToLoadProduct: 'პროდუქტის ჩატვირთვა ვერ მოხერხდა',
  ratingOutOf5: '/ 5',
  productInformation: 'პროდუქტის ინფორმაცია',
  priceFrom: 'ფასი დან',  // ახალი
  priceTo: 'ფასი მდე',    // ახალი
};

const en: Translations = {
  home: 'Home',
  about: 'About Us',
  login: 'Login',
  register: 'Register',
  logout: 'Logout',
  cart: 'Cart',
  products: 'Products',
  productsSubtitle: 'Choose your favorite tech',
  addToCart: 'Add to Cart',
  soldOut: 'Sold Out',
  inStock: 'In stock',
  details: 'Details',
  loading: '⏳ Loading...',
  error: 'Products could not be loaded',
  aboutTitle: 'About Us',
  aboutSubtitle: "TechShop — Georgia's leading tech store",
  aboutProducts: 'Products',
  aboutProductsDesc:
    'We offer the latest laptops, smartphones and other electronics at the best prices.',
  aboutDelivery: 'Delivery',
  aboutDeliveryDesc: 'Fast and reliable delivery anywhere in Georgia.',
  aboutWarranty: 'Warranty',
  aboutWarrantyDesc: 'Warranty and after-sales service on all products.',
  aboutSupport: 'Support',
  aboutSupportDesc: '24/7 customer support for any questions.',
  aboutContact: 'Contact Us',
  aboutHeadline: 'TechShop — your premium technology destination',
 aboutContactText: "We're ready to help with orders, returns, or any questions you have.",
aboutContactCta: "Send us a message and our team will get back to you shortly.", 
  contactUs: 'Contact Us',
  cartTitle: '🛒 Cart',
  cartEmpty: 'Cart is empty',
  cartTotal: 'Total',
  cartCheckout: 'Checkout ✅',
  cartClear: 'Clear Cart 🗑️',
  cartBack: '← Back to Products',
  cartQuantity: 'Quantity',
  cartPrice: 'Price',
  cartRemove: '🗑️ Remove',
  loginTitle: 'Login',
  loginSubtitle: 'Welcome back! Sign in to your account',
  loginEmail: 'Email',
  loginPassword: 'Password',
  loginBtn: 'Login',
  loginLoading: 'Loading...',
  loginSwitch: "Don't have an account? Register",
  loginError: 'Invalid email or password',
  loginEmailError: 'Please enter a valid email',
  loginPasswordError: 'Password is required',
  registerTitle: 'Register',
  registerSubtitle: 'Create a new account',
  registerFirstName: 'First Name',
  registerLastName: 'Last Name',
  registerAge: 'Age',
  registerGender: 'Gender',
  registerGenderMale: 'Male',
  registerGenderFemale: 'Female',
  registerPhone: 'Phone',
  registerAddress: 'Address',
  registerZipcode: 'Zip Code',
  registerPassword: 'Password',
  registerConfirmPassword: 'Confirm Password',
  registerBtn: 'Register',
  registerLoading: 'Loading...',
  registerSwitch: 'Already have an account? Login',
  registerError: 'Registration failed',
  registerDescription: 'Enter your details to unlock faster checkout and personalized offers.',
  registerSecure: 'Secure choice',
  registerSecureDesc: 'All transactions are protected and never stored.',
  registerFast: 'Quick signup',
  registerFastDesc: 'Three simple steps to get started.',
  createAccount: 'Create account',
  registerFormSubtitle: 'Start your journey with modern shopping.',
  registerAlreadyHaveAccount: 'Already have an account?',
  footerTagline: 'Best tech at the best price',
  footerNav: 'Navigation',
  footerContact: 'Contact',
  footerCopy: '© 2024 TechShop. All rights reserved.',
  heroStoreTag: 'Premium Tech Store',
  heroTitle: 'Welcome to TechShop',
  heroSubtitle:
    'Discover cutting-edge technology products with the best prices and quality guarantee',
  heroFastDelivery: 'Fast Delivery',
  heroSecurePayment: 'Secure Payment',
  heroBestQuality: 'Best Quality',
  searchPlaceholder: 'Search products, brands, categories...',
  allCategories: 'All Categories',
  sortMostPopular: 'Most Popular',
  sortPriceLow: 'Price: Low to High',
  sortPriceHigh: 'Price: High to Low',
  sortHighestDiscount: 'Highest Discount',
  clearAll: 'Clear All',
  resultsFound: 'Found',
  resultsProduct: 'product',
  noProductsFound: 'No products found matching your criteria',
  resetFilters: 'Reset Filters',
  viewDetails: 'View Details',
  productDetailsTitle: 'Product Details',
  productDetailsLoading: 'Loading product details...',
  backToProducts: '← Back to Products',
  customerRating: 'Customer Rating',
  productDescription: 'Description',
  save: 'Save',
  addedToCart: 'Added to Cart!',
  fieldRequired: 'is required',
  minAge: 'Min. 18',
  minPassword: 'Minimum 8 characters',
  registerFirstNameRequired: 'First Name is required',
  registerLastNameRequired: 'Last Name is required',
  registerPhoneRequired: 'Phone is required',
  registerAddressRequired: 'Address is required',
  registerZipcodeRequired: 'Zip Code is required',
  registerPasswordRequired: 'Password minimum 8 characters',
  notFoundTitle: 'Page Not Found',
  notFoundMessage: 'Oops! 404 - Page not found',
  goHome: 'Go to Home',
  productCardsWorking: 'Product Card',
  productCategory: 'Category',
  productBrand: 'Brand',
  productRating: 'Rating',
  productDiscount: 'Discount',
  freeShipping: 'Free Shipping',
  securePayment: 'Secure Payment',
  easyReturns: 'Easy Returns',
  productNotFound: 'Product not found',
  failedToLoadProduct: 'Failed to load product',
  ratingOutOf5: '/ 5',
  percentOff: '% OFF',
  productInformation: 'Product Information',
  priceFrom: 'Price from',  // ახალი
  priceTo: 'Price to',      // ახალი
};

@Injectable({ providedIn: 'root' })
export class LanguageService {
  currentLang = signal<Language>('ka');
  translations = signal<Translations>(ka);

  switchLanguage(lang: Language) {
    this.currentLang.set(lang);
    this.translations.set(lang === 'ka' ? ka : en);
  }

  toggle() {
    const next = this.currentLang() === 'ka' ? 'en' : 'ka';
    this.switchLanguage(next);
  }
}
