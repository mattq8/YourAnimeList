export default function Content() {
    // const query = `
    // query {
    //     Page(page: 1, perPage: 10) {
    //         media(type: ANIME) {
    //             id
    //             title { romaji english }
    //             coverImage { extraLarge }
    //             bannerImage
    //             description
    //             episodes
    //             status
    //             seasonYear
    //             genres
    //         }
    //     }
    // }`;

    // fetch('https://graphql.anilist.co', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ query })
    // }).then(res => res.json()).then(data => console.log(data));
    
    return (
        <main style={{ marginInline: "1.5rem;" }}>
            AnimeCa
        </main>
    );
}