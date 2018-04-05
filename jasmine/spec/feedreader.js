/* feedreader.js
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(function () {

	describe('RSS Feeds', function () {
		/* Tests to make sure that the
		 * allFeeds variable has been defined and that it is not
		 * empty. 
		 */
		it('are defined', function () {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});

		/* Test that loops through each feed
		 * in the allFeeds object and ensures it has a URL defined
		 * and that the URL is not empty.
		 */
		it('each feed has a URL defined and that URL is non empty', function () {
			allFeeds.forEach(feed => {
				expect(feed.url).toBeTruthy();
			});
		});

		/* Test that loops through each feed
		 * in the allFeeds object and ensures it has a name defined
		 * and that the name is not empty.
		 */
		it('each feed has a name defined and that name is not empty', function () {
			allFeeds.forEach(feed => {
				expect(feed.name).toBeTruthy();
			});
		});

		/* Test that loops through each feed
		 * in the allFeeds object and ensures it has a valid URL
		 */
		it('each feed has a valid URL', function () {
			allFeeds.forEach(feed => {
				expect(feed.url).toMatch(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
			});
		});
	});


	// Suite for testing hidden menu

	describe('The menu', function () {
		/* Test that ensures the menu element is
		 * hidden by default. You'll have to analyze the HTML and
		 * the CSS to determine how we're performing the
		 * hiding/showing of the menu element.
		 */

		it('is hidden by default', function () {
			/* the menu is the element with 'slide-menu' class 
			 * and is hidding/showing by adding/removing 'hidden-menu' class
			 * to the body element, consecquently applying a CSS translate 
			 * inside or outside the window. 
			 */
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});

		/* Test to ensures the menu changes
		 * visibility when the menu icon is clicked. This test
		 * should have two expectations: does the menu display when
		 * clicked and does it hide when clicked again.
		 */
		let menuIcon = $('.menu-icon-link').first();


		it('it does display when clicked', function () {
			menuIcon.click(); // toggle menu to visible state

			// check if body element has class 'menu-hidden' removed
			// if yes, then it should begin to translate inside the window
			expect($('body').hasClass('menu-hidden')).toBe(false);
			menuIcon.click(); // revert to the initial state
		});

		it('it does hide when clicked again', function () {

			menuIcon.click(); // toggle menu to visible state
			menuIcon.click(); // revert to hidden state

			// now the body element should have class  'menu-hidden'
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});
	});


	/* Test suite to check feed entries */

	describe('Initial Entries', function () {

		/* Test that ensures when the loadFeed
		 * function is called and completes its work, there is at least
		 * a single entry element within the feed container.
		 * Because loadFeed() is asynchronous this test require
		 * the use of Jasmine's beforeEach and asynchronous done() function.
		 */

		beforeEach(function (done) {
			loadFeed(1, done);
		});

		it('when the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container', function (done) {
			expect($('.feed .entry-link').length).not.toBe(0);
			done();
		});

	});

	//Test suite named 'New Feed Selection'

	describe('New Feed Selection', function () {

		// Test that ensures when a new feed is loaded
		// by the loadFeed function that the content actually changes.

		let initialFeed;

		beforeEach(function (done) {
			loadFeed(0, function () {
				initialFeed = $('.feed').html();
				loadFeed(1, done);
			});
		});


		it('when a new feed is loaded, the content actually changes', function (done) {
			expect($('.feed').html()).not.toBe(initialFeed);
			done();
		});
	});
});