import { createInertiaApp } from "@inertiajs/react";
import '../css/app.css';

createInertiaApp({
    strictMode: true,
    pages: {
        path: '/resources/pages/',
        extension: '.jsx',
    },
})