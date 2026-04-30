/**
 * Constants for the test suite
 */

export const BASE_URL = 'https://www.cnarios.com';

export const NAVIGATION_PATHS = {
  HOME: '/',
  EXPLORE: '/explore',
  CHALLENGES: '/challenges',
  INTERVIEW_QUESTIONS: '/interview-questions',
  BLOGS: '/blogs',
  CONCEPTS_IFRAME: '/concepts/iframe',
  CONCEPTS_MULTIWINDOW: '/concepts/multiwindow',
  CONCEPTS_LINKS: '/concepts/links',
  CONCEPTS_TABLE: '/concepts/table',
  CHALLENGE_PRODUCT_FILTERING: '/challenges/product-filtering',
  CHALLENGE_PRODUCT_PAGINATION: '/challenges/product-listing-pagination',
  BLOG_HTML_BASICS: '/blogs/html-basics',
  BLOG_LOCATORS: '/blogs/Locators',
};

export const TEST_TIMEOUTS = {
  SHORT: 5000,
  MEDIUM: 10000,
  LONG: 15000,
};

export const FILTER_OPTIONS = {
  COMPANY: ['Deloitte', 'Accenture', 'QualityKiosk', 'Infosys', 'Nagarro', 'Wipro'],
  DIFFICULTY: ['Easy', 'Medium', 'Hard'],
  SORT_BY: ['Most Asked', 'Recently Added'],
};

export const TEST_DATA = {
  SEARCH_KEYWORDS: ['selenium', 'framework', 'test', 'automation', 'xpath'],
  INTERVIEW_SEARCH: 'frame',
};
