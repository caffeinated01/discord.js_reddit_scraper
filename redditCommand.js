const { EmbedBuilder } = require("discord.js")

module.exports = {
	name: 'reddit',
	aliases: ['r'],
	category: 'scrapers',
	utilisation: 'reddit',
	desc: "reddit scraper",
	async execute(bot, messageCreate, args) {
        const got = await import("got")
		let subreddit = "subreddit here" //etc. unixporn
		//res => response, req => request
		//example array: let reddit = ["example-1", "example-2"]
		//random selection if you have multiple, picks from array:  let subreddit = reddit[Math.floor(Math.random() * reddit.length)];
		const embed = new EmbedBuilder()
		got.default(`https://www.reddit.com/r/${subreddit}/random/.json`)
			.then(response => {
				const [list] = JSON.parse(response.body); //response to json
				const [post] = list.data.children; //listing the data

				const permalink = post.data.permalink; //get url
				const postUrl = `https://reddit.com${permalink}`; //show url
				const postImage = post.data.url; //show image
				const postTitle = post.data.title; //show title
				const postUpvotes = post.data.ups; //show upvotes
				const postNumComments = post.data.num_comments; //show num of comments
				embed.setTitle(`${postTitle}`); //line 31-35 embed
				embed.setURL(`${postUrl}`);
				embed.setColor('RED');
				embed.setImage(postImage);
				embed.setFooter({ text: `👍 ${postUpvotes} 💬 ${postNumComments}` });
				messageCreate.channel.send({ embeds: [embed] });
			})
			.catch(console.error);
	}
}
