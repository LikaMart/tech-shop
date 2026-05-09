import { Injectable, signal } from '@angular/core';

export type Language = 'ka' | 'en';

export interface Translations {
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
  addToCart: '🛒 კალათაში',
  details: 'დეტალები',
  loading: '⏳ იტვირთება...',
  error: 'პროდუქტები ვერ ჩაიტვირთა',
  aboutTitle: 'ჩვენს შესახებ',
  aboutSubtitle: 'TechShop — საქართველოს წამყვანი ტექნიკის მაღაზია',
  aboutProducts: 'პროდუქტები',
  aboutProductsDesc: 'გთავაზობთ უახლეს ლეპტოპებს, სმარტფონებს და სხვა ელექტრონიკას საუკეთესო ფასებად.',
  aboutDelivery: 'მიწოდება',
  aboutDeliveryDesc: 'სწრაფი და საიმედო მიწოდება საქართველოს ნებისმიერ კუთხეში.',
  aboutWarranty: 'გარანტია',
  aboutWarrantyDesc: 'ყველა პროდუქტზე გარანტია და გაყიდვის შემდგომი სერვისი.',
  aboutSupport: 'მხარდაჭერა',
  aboutSupportDesc: '24/7 მომხმარებელთა მხარდაჭერა ნებისმიერი კითხვისთვის.',
  aboutContact: 'დაგვიკავშირდი',
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
  footerTagline: 'საუკეთესო ტექნიკა საუკეთესო ფასად',
  footerNav: 'ნავიგაცია',
  footerContact: 'კონტაქტი',
  footerCopy: '© 2024 TechShop. ყველა უფლება დაცულია.'
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
  addToCart: '🛒 Add to Cart',
  details: 'Details',
  loading: '⏳ Loading...',
  error: 'Products could not be loaded',
  aboutTitle: 'About Us',
  aboutSubtitle: "TechShop — Georgia's leading tech store",
  aboutProducts: 'Products',
  aboutProductsDesc: 'We offer the latest laptops, smartphones and other electronics at the best prices.',
  aboutDelivery: 'Delivery',
  aboutDeliveryDesc: 'Fast and reliable delivery anywhere in Georgia.',
  aboutWarranty: 'Warranty',
  aboutWarrantyDesc: 'Warranty and after-sales service on all products.',
  aboutSupport: 'Support',
  aboutSupportDesc: '24/7 customer support for any questions.',
  aboutContact: 'Contact Us',
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
  footerTagline: 'Best tech at the best price',
  footerNav: 'Navigation',
  footerContact: 'Contact',
  footerCopy: '© 2024 TechShop. All rights reserved.'
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
