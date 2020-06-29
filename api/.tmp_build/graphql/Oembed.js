"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Oembed = void 0;
const nexus_1 = require("nexus");
exports.Oembed = nexus_1.schema.objectType({
    name: "Oembed",
    definition(t) {
        t.string("type");
        t.string("version");
        t.string("title");
        t.string("author_name", {
            nullable: true,
        });
        t.string("author_url", {
            nullable: true,
        });
        t.string("provider_name", {
            nullable: true,
        });
        t.string("provider_url", {
            nullable: true,
        });
        t.string("cache_age", {
            nullable: true,
        });
        t.string("thumbnail_url", {
            nullable: true,
        });
        t.string("thumbnail_width", {
            nullable: true,
        });
        t.string("thumbnail_height", {
            nullable: true,
        });
        t.string("html", {
            nullable: true,
        });
        t.string("width", {
            nullable: true,
        });
        t.string("height", {
            nullable: true,
        });
    },
});
