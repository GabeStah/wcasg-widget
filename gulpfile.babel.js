require('dotenv').config()
import gulp, { dest, series, src } from 'gulp';
import faker from 'faker';
import fetch from 'node-fetch';

gulp.task('export:widget:dashboard', () => {
  try {
    return src('build/widget.base.js').pipe(
      dest('../dashboard/storage/app/widget/')
    );
  } catch (error) {
    throw error;
  }
});

gulp.task('gcp:tts:test', async () => {
  const counts = [
    {
      words: 5
    },
    {
      words: 15
    },
    {
      words: 25
    },
    {
      words: 50
    },
    {
      words: 100
    },
    {
      words: 150
    },
    {
      words: 200
    },
    {
      words: 250
    },
    {
      words: 500
    }
  ];

  const phrases = counts.map(item => {
    return { text: faker.random.words(item.words), words: item.words };
  });

  for (const phrase of phrases) {
    const result = await fetch(process.env.TTS_API_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify({
          text: phrase.text
        }),
        headers: {
          'Content-Type': 'application/json',
        }
    });
    const data = await result.json();
    console.log(data.audioContent ? data.audioContent.length : 'Failed');
  }
});

gulp.task('postbuild', series('export:widget:dashboard'));

export default gulp;
