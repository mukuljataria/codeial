import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import * as sass from 'sass';
import cssnano from 'gulp-cssnano';
import rev from 'gulp-rev';
import uglify from 'gulp-uglify-es';
import imagemin from 'gulp-imagemin';
import { deleteAsync } from 'del';
import path from 'path';
import through2 from 'through2';

const compileSass = gulpSass(sass);

// Define the manifest path to ensure consistency
const MANIFEST_PATH = './public/assets/rev-manifest.json';

// Minify and revision CSS
gulp.task('css', function () {
  console.log('Minifying CSS...');
  
  return gulp.src('./assets/scss/**/*.scss')
    .pipe(compileSass().on('error', compileSass.logError))
    .pipe(cssnano())
    .pipe(gulp.dest('./assets/css'))
    .pipe(rev())
    .pipe(gulp.dest('./public/assets/css'))
    .pipe(rev.manifest(MANIFEST_PATH, {
      base: './public/assets',
      merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
});

// Minify and revision JavaScript
gulp.task('js', function () {
  console.log('Minifying JS...');
  
  return gulp.src('./assets/js/**/*.js')
    .pipe(uglify.default())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets/js'))
    .pipe(rev.manifest(MANIFEST_PATH, {
      base: './public/assets',
      merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
});

// Compress and revision images
gulp.task('images', function () {
  console.log('Compressing images...');
  
  return gulp.src('./assets/images/**/*.{png,jpg,gif,svg,jpeg}')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets/images'))
    .pipe(rev.manifest(MANIFEST_PATH, {
      base: './public/assets',
      merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
});

// Custom function to format manifest paths
gulp.task('format-manifest', function() {
  return gulp.src(MANIFEST_PATH)
    .pipe(through2.obj(function(file, enc, cb) {
      if (file.isNull()) {
        return cb(null, file);
      }
      
      try {
        const manifest = JSON.parse(file.contents.toString());
        const formatted = {};
        
        // Format each entry to include the subdirectory
        Object.entries(manifest).forEach(([key, value]) => {
          // Determine the subdirectory based on file extension
          let subdir;
          if (/\.(jpg|jpeg|png|gif|svg)$/i.test(key)) {
            subdir = 'images';
          } else if (/\.js$/i.test(key)) {
            subdir = 'js';
          } else if (/\.css$/i.test(key)) {
            subdir = 'css';
          } else {
            subdir = 'other';
          }
          
          // Create the new prefixed paths
          formatted[`${subdir}/${key}`] = `${subdir}/${value}`;
        });
        
        // Update the file contents with the formatted manifest
        file.contents = Buffer.from(JSON.stringify(formatted, null, 2));
      } catch (err) {
        console.error('Error formatting manifest:', err);
      }
      
      cb(null, file);
    }))
    .pipe(gulp.dest('./public/assets'));
});

// Clean public assets directory
gulp.task('clean:assets', function () {
  console.log('Cleaning assets...');
  return deleteAsync(['./public/assets', MANIFEST_PATH]);
});

// Build task with manifest formatting
gulp.task('build', gulp.series(
  'clean:assets',
  'css',
  'js',
  'images',
  'format-manifest',
  function (done) {
    console.log('Building assets complete!');
    done();
  }
));



// import gulp from 'gulp';
// import gulpSass from 'gulp-sass';
// import * as sass from 'sass';
// import cssnano from 'gulp-cssnano';
// import rev from 'gulp-rev';
// import uglify from 'gulp-uglify-es';
// import imagemin from 'gulp-imagemin';
// import { deleteAsync } from 'del';
// import merge from 'gulp-merge-json'; // Add this dependency

// const compileSass = gulpSass(sass);

// // Define the manifest path to ensure consistency
// const MANIFEST_PATH = './public/assets/rev-manifest.json';

// // Minify and revision CSS
// gulp.task('css', function () {
//     console.log('Minifying CSS...');
    
//     return gulp.src('./assets/scss/**/*.scss')
//         .pipe(compileSass().on('error', compileSass.logError))
//         .pipe(cssnano())
//         .pipe(gulp.dest('./assets/css'))
//         .pipe(rev()) // Add revisioning
//         .pipe(gulp.dest('./public/assets/css'))
//         .pipe(rev.manifest(MANIFEST_PATH, {
//             base: './public/assets',
//             merge: true // Enable merging
//         }))
//         .pipe(gulp.dest('./public/assets'));
// });

// // Minify and revision JavaScript
// gulp.task('js', function () {
//     console.log('Minifying JS...');
    
//     return gulp.src('./assets/js/**/*.js', { base: './assets/js' })
//         .pipe(uglify.default())
//         .pipe(rev())
//         .pipe(gulp.dest('./public/assets/js'))
//         .pipe(rev.manifest(MANIFEST_PATH, {
//             base: './public/assets',
//             merge: true // Enable merging
//         }))
//         .pipe(gulp.dest('./public/assets'));
// });

// // Compress and revision images
// gulp.task('images', function () {
//     console.log('Compressing images...');
    
//     return gulp.src('./assets/images/**/*.{png,jpg,gif,svg,jpeg}', { base: './assets/images' })
//         .pipe(imagemin())
//         .pipe(rev())
//         .pipe(gulp.dest('./public/assets/images'))
//         .pipe(rev.manifest(MANIFEST_PATH, {
//             base: './public/assets',
//             merge: true // Enable merging
//         }))
//         .pipe(gulp.dest('./public/assets'));
// });

// // Clean public assets directory
// gulp.task('clean:assets', function () {
//     console.log('Cleaning assets...');
//     return deleteAsync(['./public/assets', MANIFEST_PATH]);
// });

// // Build task - runs clean first, then processes CSS, JS, and images
// gulp.task('build', gulp.series('clean:assets', 'css', 'js', 'images', function (done) {
//     console.log('Building assets...');
//     done();
// }));






// import gulp from 'gulp';
// import gulpSass from 'gulp-sass';
// import * as sass from 'sass';
// import cssnano from 'gulp-cssnano';
// import rev from 'gulp-rev';
// import uglify from 'gulp-uglify-es';
// import imagemin from 'gulp-imagemin';
// import { deleteAsync } from 'del'; // Fixed import for 'del'

// const compileSass = gulpSass(sass);

// // Minify and revision CSS
// gulp.task('css', function (done) {
//     console.log('Minifying CSS...');
    
//     gulp.src('./assets/scss/**/*.scss')
//         .pipe(compileSass().on('error', compileSass.logError))
//         .pipe(cssnano())
//         .pipe(gulp.dest('./assets/css'))
//         .pipe(rev()) // Add revisioning
//         .pipe(gulp.dest('./public/assets/css'))
//         .pipe(rev.manifest({
//             cwd: 'public',
//             merge: true,
//         }))
//         .pipe(gulp.dest('./public/assets/css'));
//         done();
// });

// // Minify and revision JavaScript
// gulp.task('js', function (done) {
//     console.log('Minifying JS...');
    
//     gulp.src('./assets/js/**/*.js', { base: './assets/js' }) // Ensure base is set correctly
//         .pipe(uglify.default()) // Use .default() for ES module compatibility
//         .pipe(rev())
//         .pipe(gulp.dest('./public/assets/js')) // Ensure correct destination
//         .pipe(rev.manifest({
//             cwd: 'public',
//             merge: true,
//         }))
//         .pipe(gulp.dest('./public/assets/js')); // Ensure manifest goes into correct folder
//         done();
// });


// // Compress and revision images
// gulp.task('images', function (done) {
//     console.log('Compressing images...');
    
//     gulp.src('./assets/images/**/*.{png,jpg,gif,svg,jpeg}', { base: './assets/images' }) // Set correct base
//         .pipe(imagemin())
//         .pipe(rev())
//         .pipe(gulp.dest('./public/assets/images')) // Ensure correct destination
//         .pipe(rev.manifest({
//             cwd: 'public',
//             merge: true,
//         }))
//         .pipe(gulp.dest('./public/assets/images')); // Ensure manifest is stored correctly
//         done();
// });


// // Clean public assets directory
// gulp.task('clean:assets', function () {
//     console.log('Cleaning assets...');
//     return deleteAsync('./public/assets'); // Fixed to use 'deleteAsync'
// });

// // Build task - runs clean first, then processes CSS, JS, and images
// gulp.task('build', gulp.series('clean:assets', 'css', 'js', 'images', function (done) {
//     console.log('Building assets...');
//     done();
// }));








