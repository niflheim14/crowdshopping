/*	
	scopes: 	
		var scope = ['r_basicprofile', 'r_fullprofile', 'r_emailaddress', 'r_network', 'r_contactinfo', 'rw_nus', 'rw_groups', 'w_messages'];
*/
/*
	Basic Profile:
		https://developer.linkedin.com/docs/fields/basic-profile
	Member Profile fields:		
	    Full Profile Fields
	    Contact Info Fields
	    Company Fields
	    Publication Fields
	    Patent Fields
	    Language Fields
	    Skill Fields
	    Certification Fields
	    Course Fields
	    Education Fields
	    Volunteer Fields
	    Recommendation fields
	Consultar: 
		https://developer.linkedin.com/docs/fields
		https://developer.linkedin.com/docs/fields/full-profile
*/
function getUser (linkedin, fn) {

	/*
		Basic profile Fields:
					['id', 'first-name', 'last-name', 'maiden-name',
                      'formatted-name', 'headline', 'location',
                      'industry', 'current-share', 'num-connections', 'num-connections-capped',
                      'summary', 'specialties', 'positions', 'picture-url','picture-urls::(original)',
                      'email-address', 'last-modified-timestamp', 'associations', 'interests',
                      'publications', 'patents', 'languages', 'skills', 'certifications',
                      'educations', 'courses', 'volunteer', 'num-recommenders',
                      'recommendations-received', 'mfeed-rss-url', 'following', 'job-bookmarks',
                      'suggestions', 'date-of-birth', 'related-profile-views', 'honors-awards',
                      'phone-numbers', 'bound-account-types', 'im-accounts', 'main-address',
                      'twitter-accounts', 'primary-twitter-account', 'connections', 'group-memberships',
                      'network', 'public-profile-url']
	*/
	linkedin.people.me(['id', 'first-name', 'last-name'], function(err, result) {
	    // Loads the profile of access token owner.
	    fn(result);
	});
}

module.exports.getUser = getUser;

/*

Profile by public URL
linkedin.people.url('long_public_url_here', function(err, $in) {
    // Returns dob, education
});

OR

linkedin.people.url('long_public_url_here', ['id', 'first-name', 'last-name'], function(err, $in) {
    // Returns dob, education
});

Connections 
linkedin.connections.retrieve(function(err, connections) {
    // Here you go! Got your connections!
});

Companies search
linkedin.companies_search.name('facebook', 1, function(err, company) {
    name = company.companies.values[0].name;
    desc = company.companies.values[0].description;
    industry = company.companies.values[0].industries.values[0].name;
    city = company.companies.values[0].locations.values[0].address.city;
    websiteUrl = company.companies.values[0].websiteUrl;
});

Companies
linkedin.companies.company('162479', function(err, company) {
    // Here you go
});

linkedin.companies.name('logica', function(err, company) {
    // Here you go
});

linkedin.companies.email_domain('apple.com', function(err, company) {
    // Here you go
});

linkedin.companies.multiple('162479,universal-name=linkedin', function(err, companies) {
    // Here you go
});

linkedin.companies.asAdmin(function(err, companies) {
    // Here you go
});
*/


