var ce = Object.defineProperty;
var de = (U, C, I) =>
  C in U
    ? ce(U, C, { enumerable: !0, configurable: !0, writable: !0, value: I })
    : (U[C] = I);
var k = (U, C, I) => de(U, typeof C != "symbol" ? C + "" : C, I);
(function () {
  "use strict";
  const U = "request-key",
    C = "/{Subpath prefix}/{Subpath}",
    I = "https://placehold.co/400x600?text=Image";
  var $ =
    typeof globalThis < "u"
      ? // eslint-disable-next-line no-undef
        globalThis
      : typeof window < "u"
        ? window
        : typeof global < "u"
          ? global
          : typeof self < "u"
            ? self
            : {};
  function M(v) {
    return v &&
      v.__esModule &&
      Object.prototype.hasOwnProperty.call(v, "default")
      ? v.default
      : v;
  }
  var F = { exports: {} };
  (function (v) {
    (function (n) {
      var a = n.URL || n.webkitURL;
      function r(t) {
        return a ? a.createObjectURL(t) : !1;
      }
      function e(t) {
        return a ? a.revokeObjectURL(t) : !1;
      }
      function o(t, i) {
        t && t.slice(0, 5) === "blob:" && !(i && i.noRevoke) && e(t);
      }
      function d(t, i, s, c) {
        if (!n.FileReader) return !1;
        var l = new FileReader();
        (l.onload = function () {
          i.call(l, this.result);
        }),
          s &&
            (l.onabort = l.onerror =
              function () {
                s.call(l, this.error);
              });
        var h = l[c || "readAsDataURL"];
        if (h) return h.call(l, t), l;
      }
      function g(t, i) {
        return Object.prototype.toString.call(i) === "[object " + t + "]";
      }
      function m(t, i, s) {
        function c(l, h) {
          var u = document.createElement("img"),
            f;
          function w(p, y) {
            if (l === h) {
              l && l(p, y);
              return;
            } else if (p instanceof Error) {
              h(p);
              return;
            }
            (y = y || {}), (y.image = p), l(y);
          }
          function b(p, y) {
            y && n.console && console.log(y),
              p && g("Blob", p)
                ? ((t = p), (f = r(t)))
                : ((f = t),
                  s && s.crossOrigin && (u.crossOrigin = s.crossOrigin)),
              (u.src = f);
          }
          if (
            ((u.onerror = function (p) {
              o(f, s), h && h.call(u, p);
            }),
            (u.onload = function () {
              o(f, s);
              var p = {
                originalWidth: u.naturalWidth || u.width,
                originalHeight: u.naturalHeight || u.height,
              };
              try {
                m.transform(u, s, w, t, p);
              } catch (y) {
                h && h(y);
              }
            }),
            typeof t == "string")
          )
            return m.requiresMetaData(s) ? m.fetchBlob(t, b, s) : b(), u;
          if (g("Blob", t) || g("File", t))
            return (
              (f = r(t)),
              f
                ? ((u.src = f), u)
                : d(
                    t,
                    function (p) {
                      u.src = p;
                    },
                    h,
                  )
            );
        }
        return n.Promise && typeof i != "function"
          ? ((s = i), new Promise(c))
          : c(i, i);
      }
      (m.requiresMetaData = function (t) {
        return t && t.meta;
      }),
        (m.fetchBlob = function (t, i) {
          i();
        }),
        (m.transform = function (t, i, s, c, l) {
          s(t, l);
        }),
        (m.global = n),
        (m.readFile = d),
        (m.isInstanceOf = g),
        (m.createObjectURL = r),
        (m.revokeObjectURL = e),
        v.exports ? (v.exports = m) : (n.loadImage = m);
    })((typeof window < "u" && window) || $);
  })(F);
  var L = F.exports,
    H = { exports: {} };
  (function (v) {
    (function (n) {
      v.exports ? n(L) : n(window.loadImage);
    })(function (n) {
      var a = n.transform;
      (n.createCanvas = function (r, e, o) {
        if (o && n.global.OffscreenCanvas) return new OffscreenCanvas(r, e);
        var d = document.createElement("canvas");
        return (d.width = r), (d.height = e), d;
      }),
        (n.transform = function (r, e, o, d, g) {
          a.call(n, n.scale(r, e, g), e, o, d, g);
        }),
        (n.transformCoordinates = function () {}),
        (n.getTransformedOptions = function (r, e) {
          var o = e.aspectRatio,
            d,
            g,
            m,
            t;
          if (!o) return e;
          d = {};
          for (g in e)
            Object.prototype.hasOwnProperty.call(e, g) && (d[g] = e[g]);
          return (
            (d.crop = !0),
            (m = r.naturalWidth || r.width),
            (t = r.naturalHeight || r.height),
            m / t > o
              ? ((d.maxWidth = t * o), (d.maxHeight = t))
              : ((d.maxWidth = m), (d.maxHeight = m / o)),
            d
          );
        }),
        (n.drawImage = function (r, e, o, d, g, m, t, i, s) {
          var c = e.getContext("2d");
          return (
            s.imageSmoothingEnabled === !1
              ? ((c.msImageSmoothingEnabled = !1),
                (c.imageSmoothingEnabled = !1))
              : s.imageSmoothingQuality &&
                (c.imageSmoothingQuality = s.imageSmoothingQuality),
            c.drawImage(r, o, d, g, m, 0, 0, t, i),
            c
          );
        }),
        (n.requiresCanvas = function (r) {
          return r.canvas || r.crop || !!r.aspectRatio;
        }),
        (n.scale = function (r, e, o) {
          (e = e || {}), (o = o || {});
          var d =
              r.getContext ||
              (n.requiresCanvas(e) && !!n.global.HTMLCanvasElement),
            g = r.naturalWidth || r.width,
            m = r.naturalHeight || r.height,
            t = g,
            i = m,
            s,
            c,
            l,
            h,
            u,
            f,
            w,
            b,
            p,
            y,
            x,
            S;
          function A() {
            var B = Math.max((l || t) / t, (h || i) / i);
            B > 1 && ((t *= B), (i *= B));
          }
          function E() {
            var B = Math.min((s || t) / t, (c || i) / i);
            B < 1 && ((t *= B), (i *= B));
          }
          if (
            (d &&
              ((e = n.getTransformedOptions(r, e, o)),
              (w = e.left || 0),
              (b = e.top || 0),
              e.sourceWidth
                ? ((u = e.sourceWidth),
                  e.right !== void 0 &&
                    e.left === void 0 &&
                    (w = g - u - e.right))
                : (u = g - w - (e.right || 0)),
              e.sourceHeight
                ? ((f = e.sourceHeight),
                  e.bottom !== void 0 &&
                    e.top === void 0 &&
                    (b = m - f - e.bottom))
                : (f = m - b - (e.bottom || 0)),
              (t = u),
              (i = f)),
            (s = e.maxWidth),
            (c = e.maxHeight),
            (l = e.minWidth),
            (h = e.minHeight),
            d && s && c && e.crop
              ? ((t = s),
                (i = c),
                (x = u / f - s / c),
                x < 0
                  ? ((f = (c * u) / s),
                    e.top === void 0 &&
                      e.bottom === void 0 &&
                      (b = (m - f) / 2))
                  : x > 0 &&
                    ((u = (s * f) / c),
                    e.left === void 0 &&
                      e.right === void 0 &&
                      (w = (g - u) / 2)))
              : ((e.contain || e.cover) && ((l = s = s || l), (h = c = c || h)),
                e.cover ? (E(), A()) : (A(), E())),
            d)
          ) {
            if (
              ((p = e.pixelRatio),
              p > 1 &&
                !(
                  r.style.width &&
                  Math.floor(parseFloat(r.style.width, 10)) ===
                    Math.floor(g / p)
                ) &&
                ((t *= p), (i *= p)),
              n.orientationCropBug &&
                !r.getContext &&
                (w || b || u !== g || f !== m) &&
                ((x = r),
                (r = n.createCanvas(g, m, !0)),
                n.drawImage(x, r, 0, 0, g, m, g, m, e)),
              (y = e.downsamplingRatio),
              y > 0 && y < 1 && t < u && i < f)
            )
              for (; u * y > t; )
                (S = n.createCanvas(u * y, f * y, !0)),
                  n.drawImage(r, S, w, b, u, f, S.width, S.height, e),
                  (w = 0),
                  (b = 0),
                  (u = S.width),
                  (f = S.height),
                  (r = S);
            return (
              (S = n.createCanvas(t, i)),
              n.transformCoordinates(S, e, o),
              p > 1 && (S.style.width = S.width / p + "px"),
              n
                .drawImage(r, S, w, b, u, f, t, i, e)
                .setTransform(1, 0, 0, 1, 0, 0),
              S
            );
          }
          return (r.width = t), (r.height = i), r;
        });
    });
  })(H);
  var Y = H.exports,
    G = { exports: {} };
  (function (v) {
    (function (n) {
      v.exports ? n(L) : n(window.loadImage);
    })(function (n) {
      var a = n.global,
        r = n.transform,
        e =
          a.Blob &&
          (Blob.prototype.slice ||
            Blob.prototype.webkitSlice ||
            Blob.prototype.mozSlice),
        o =
          (a.ArrayBuffer && ArrayBuffer.prototype.slice) ||
          function (i, s) {
            s = s || this.byteLength - i;
            var c = new Uint8Array(this, i, s),
              l = new Uint8Array(s);
            return l.set(c), l.buffer;
          },
        d = { jpeg: { 65505: [], 65517: [] } };
      function g(i, s, c, l) {
        var h = this;
        function u(f, w) {
          if (
            !(a.DataView && e && i && i.size >= 12 && i.type === "image/jpeg")
          )
            return f(l);
          var b = c.maxMetaDataSize || 262144;
          n.readFile(
            e.call(i, 0, b),
            function (p) {
              var y = new DataView(p);
              if (y.getUint16(0) !== 65496)
                return w(new Error("Invalid JPEG file: Missing JPEG marker."));
              for (
                var x = 2, S = y.byteLength - 4, A = x, E, B, _, D;
                x < S &&
                ((E = y.getUint16(x)),
                (E >= 65504 && E <= 65519) || E === 65534);

              ) {
                if (((B = y.getUint16(x + 2) + 2), x + B > y.byteLength)) {
                  console.log("Invalid JPEG metadata: Invalid segment size.");
                  break;
                }
                if (((_ = d.jpeg[E]), _ && !c.disableMetaDataParsers))
                  for (D = 0; D < _.length; D += 1) _[D].call(h, y, x, B, l, c);
                (x += B), (A = x);
              }
              !c.disableImageHead && A > 6 && (l.imageHead = o.call(p, 0, A)),
                f(l);
            },
            w,
            "readAsArrayBuffer",
          ) || f(l);
        }
        return (
          (c = c || {}),
          a.Promise && typeof s != "function"
            ? ((c = s || {}), (l = c), new Promise(u))
            : ((l = l || {}), u(s, s))
        );
      }
      function m(i, s, c) {
        return !i || !s || !c
          ? null
          : new Blob([c, e.call(i, s.byteLength)], { type: "image/jpeg" });
      }
      function t(i, s, c) {
        var l = { maxMetaDataSize: 1024, disableMetaDataParsers: !0 };
        if (!c && a.Promise)
          return g(i, l).then(function (h) {
            return m(i, h.imageHead, s);
          });
        g(
          i,
          function (h) {
            c(m(i, h.imageHead, s));
          },
          l,
        );
      }
      (n.transform = function (i, s, c, l, h) {
        n.requiresMetaData(s)
          ? ((h = h || {}),
            g(
              l,
              function (u) {
                u !== h && (a.console && console.log(u), (u = h)),
                  r.call(n, i, s, c, l, u);
              },
              s,
              h,
            ))
          : r.apply(n, arguments);
      }),
        (n.blobSlice = e),
        (n.bufferSlice = o),
        (n.replaceHead = t),
        (n.parseMetaData = g),
        (n.metaDataParsers = d);
    });
  })(G);
  var T = G.exports,
    X = { exports: {} };
  (function (v) {
    (function (n) {
      v.exports ? n(L) : n(window.loadImage);
    })(function (n) {
      var a = n.global;
      a.fetch && a.Request && a.Response && a.Response.prototype.blob
        ? (n.fetchBlob = function (r, e, o) {
            function d(g) {
              return g.blob();
            }
            if (a.Promise && typeof e != "function")
              return fetch(new Request(r, e)).then(d);
            fetch(new Request(r, o))
              .then(d)
              .then(e)
              .catch(function (g) {
                e(null, g);
              });
          })
        : a.XMLHttpRequest &&
          new XMLHttpRequest().responseType === "" &&
          (n.fetchBlob = function (r, e, o) {
            function d(g, m) {
              o = o || {};
              var t = new XMLHttpRequest();
              t.open(o.method || "GET", r),
                o.headers &&
                  Object.keys(o.headers).forEach(function (i) {
                    t.setRequestHeader(i, o.headers[i]);
                  }),
                (t.withCredentials = o.credentials === "include"),
                (t.responseType = "blob"),
                (t.onload = function () {
                  g(t.response);
                }),
                (t.onerror =
                  t.onabort =
                  t.ontimeout =
                    function (i) {
                      g === m ? m(null, i) : m(i);
                    }),
                t.send(o.body);
            }
            return a.Promise && typeof e != "function"
              ? ((o = e), new Promise(d))
              : d(e, e);
          });
    });
  })(X);
  var Q = { exports: {} };
  (function (v) {
    (function (n) {
      v.exports ? n(L, T) : n(window.loadImage);
    })(function (n) {
      function a(t) {
        t &&
          (Object.defineProperty(this, "map", { value: this.ifds[t].map }),
          Object.defineProperty(this, "tags", {
            value: (this.tags && this.tags[t]) || {},
          }));
      }
      (a.prototype.map = {
        Orientation: 274,
        Thumbnail: "ifd1",
        Blob: 513,
        Exif: 34665,
        GPSInfo: 34853,
        Interoperability: 40965,
      }),
        (a.prototype.ifds = {
          ifd1: { name: "Thumbnail", map: a.prototype.map },
          34665: { name: "Exif", map: {} },
          34853: { name: "GPSInfo", map: {} },
          40965: { name: "Interoperability", map: {} },
        }),
        (a.prototype.get = function (t) {
          return this[t] || this[this.map[t]];
        });
      function r(t, i, s) {
        if (s) {
          if (i + s > t.byteLength) {
            console.log("Invalid Exif data: Invalid thumbnail data.");
            return;
          }
          return new Blob([n.bufferSlice.call(t.buffer, i, i + s)], {
            type: "image/jpeg",
          });
        }
      }
      var e = {
        1: {
          getValue: function (t, i) {
            return t.getUint8(i);
          },
          size: 1,
        },
        2: {
          getValue: function (t, i) {
            return String.fromCharCode(t.getUint8(i));
          },
          size: 1,
          ascii: !0,
        },
        3: {
          getValue: function (t, i, s) {
            return t.getUint16(i, s);
          },
          size: 2,
        },
        4: {
          getValue: function (t, i, s) {
            return t.getUint32(i, s);
          },
          size: 4,
        },
        5: {
          getValue: function (t, i, s) {
            return t.getUint32(i, s) / t.getUint32(i + 4, s);
          },
          size: 8,
        },
        9: {
          getValue: function (t, i, s) {
            return t.getInt32(i, s);
          },
          size: 4,
        },
        10: {
          getValue: function (t, i, s) {
            return t.getInt32(i, s) / t.getInt32(i + 4, s);
          },
          size: 8,
        },
      };
      e[7] = e[1];
      function o(t, i, s, c, l, h) {
        var u = e[c],
          f,
          w,
          b,
          p,
          y,
          x;
        if (!u) {
          console.log("Invalid Exif data: Invalid tag type.");
          return;
        }
        if (
          ((f = u.size * l),
          (w = f > 4 ? i + t.getUint32(s + 8, h) : s + 8),
          w + f > t.byteLength)
        ) {
          console.log("Invalid Exif data: Invalid data offset.");
          return;
        }
        if (l === 1) return u.getValue(t, w, h);
        for (b = [], p = 0; p < l; p += 1)
          b[p] = u.getValue(t, w + p * u.size, h);
        if (u.ascii) {
          for (y = "", p = 0; p < b.length && ((x = b[p]), x !== "\0"); p += 1)
            y += x;
          return y;
        }
        return b;
      }
      function d(t, i, s) {
        return (!t || t[s]) && (!i || i[s] !== !0);
      }
      function g(t, i, s, c, l, h, u, f) {
        var w, b, p, y, x, S;
        if (s + 6 > t.byteLength) {
          console.log("Invalid Exif data: Invalid directory offset.");
          return;
        }
        if (
          ((w = t.getUint16(s, c)), (b = s + 2 + 12 * w), b + 4 > t.byteLength)
        ) {
          console.log("Invalid Exif data: Invalid directory size.");
          return;
        }
        for (p = 0; p < w; p += 1)
          (y = s + 2 + 12 * p),
            (x = t.getUint16(y, c)),
            d(u, f, x) &&
              ((S = o(
                t,
                i,
                y,
                t.getUint16(y + 2, c),
                t.getUint32(y + 4, c),
                c,
              )),
              (l[x] = S),
              h && (h[x] = y));
        return t.getUint32(b, c);
      }
      function m(t, i, s, c, l, h, u) {
        var f = t.exif[i];
        f &&
          ((t.exif[i] = new a(i)),
          t.exifOffsets && (t.exifOffsets[i] = new a(i)),
          g(
            s,
            c,
            c + f,
            l,
            t.exif[i],
            t.exifOffsets && t.exifOffsets[i],
            h && h[i],
            u && u[i],
          ));
      }
      (n.parseExifData = function (t, i, s, c, l) {
        if (!l.disableExif) {
          var h = l.includeExifTags,
            u = l.excludeExifTags || { 34665: { 37500: !0 } },
            f = i + 10,
            w,
            b,
            p;
          if (t.getUint32(i + 4) === 1165519206) {
            if (f + 8 > t.byteLength) {
              console.log("Invalid Exif data: Invalid segment size.");
              return;
            }
            if (t.getUint16(i + 8) !== 0) {
              console.log("Invalid Exif data: Missing byte alignment offset.");
              return;
            }
            switch (t.getUint16(f)) {
              case 18761:
                w = !0;
                break;
              case 19789:
                w = !1;
                break;
              default:
                console.log(
                  "Invalid Exif data: Invalid byte alignment marker.",
                );
                return;
            }
            if (t.getUint16(f + 2, w) !== 42) {
              console.log("Invalid Exif data: Missing TIFF marker.");
              return;
            }
            (b = t.getUint32(f + 4, w)),
              (c.exif = new a()),
              l.disableExifOffsets ||
                ((c.exifOffsets = new a()),
                (c.exifTiffOffset = f),
                (c.exifLittleEndian = w)),
              (b = g(t, f, f + b, w, c.exif, c.exifOffsets, h, u)),
              b &&
                d(h, u, "ifd1") &&
                ((c.exif.ifd1 = b),
                c.exifOffsets && (c.exifOffsets.ifd1 = f + b)),
              Object.keys(c.exif.ifds).forEach(function (y) {
                m(c, y, t, f, w, h, u);
              }),
              (p = c.exif.ifd1),
              p && p[513] && (p[513] = r(t, f + p[513], p[514]));
          }
        }
      }),
        n.metaDataParsers.jpeg[65505].push(n.parseExifData),
        (n.exifWriters = {
          274: function (t, i, s) {
            var c = i.exifOffsets[274];
            if (!c) return t;
            var l = new DataView(t, c + 8, 2);
            return l.setUint16(0, s, i.exifLittleEndian), t;
          },
        }),
        (n.writeExifData = function (t, i, s, c) {
          return n.exifWriters[i.exif.map[s]](t, i, c);
        }),
        (n.ExifMap = a);
    });
  })(Q);
  var j = Q.exports,
    J = { exports: {} };
  (function (v) {
    (function (n) {
      v.exports ? n(L, j) : n(window.loadImage);
    })(function (n) {
      var a = n.ExifMap.prototype;
      (a.tags = {
        256: "ImageWidth",
        257: "ImageHeight",
        258: "BitsPerSample",
        259: "Compression",
        262: "PhotometricInterpretation",
        274: "Orientation",
        277: "SamplesPerPixel",
        284: "PlanarConfiguration",
        530: "YCbCrSubSampling",
        531: "YCbCrPositioning",
        282: "XResolution",
        283: "YResolution",
        296: "ResolutionUnit",
        273: "StripOffsets",
        278: "RowsPerStrip",
        279: "StripByteCounts",
        513: "JPEGInterchangeFormat",
        514: "JPEGInterchangeFormatLength",
        301: "TransferFunction",
        318: "WhitePoint",
        319: "PrimaryChromaticities",
        529: "YCbCrCoefficients",
        532: "ReferenceBlackWhite",
        306: "DateTime",
        270: "ImageDescription",
        271: "Make",
        272: "Model",
        305: "Software",
        315: "Artist",
        33432: "Copyright",
        34665: {
          36864: "ExifVersion",
          40960: "FlashpixVersion",
          40961: "ColorSpace",
          40962: "PixelXDimension",
          40963: "PixelYDimension",
          42240: "Gamma",
          37121: "ComponentsConfiguration",
          37122: "CompressedBitsPerPixel",
          37500: "MakerNote",
          37510: "UserComment",
          40964: "RelatedSoundFile",
          36867: "DateTimeOriginal",
          36868: "DateTimeDigitized",
          36880: "OffsetTime",
          36881: "OffsetTimeOriginal",
          36882: "OffsetTimeDigitized",
          37520: "SubSecTime",
          37521: "SubSecTimeOriginal",
          37522: "SubSecTimeDigitized",
          33434: "ExposureTime",
          33437: "FNumber",
          34850: "ExposureProgram",
          34852: "SpectralSensitivity",
          34855: "PhotographicSensitivity",
          34856: "OECF",
          34864: "SensitivityType",
          34865: "StandardOutputSensitivity",
          34866: "RecommendedExposureIndex",
          34867: "ISOSpeed",
          34868: "ISOSpeedLatitudeyyy",
          34869: "ISOSpeedLatitudezzz",
          37377: "ShutterSpeedValue",
          37378: "ApertureValue",
          37379: "BrightnessValue",
          37380: "ExposureBias",
          37381: "MaxApertureValue",
          37382: "SubjectDistance",
          37383: "MeteringMode",
          37384: "LightSource",
          37385: "Flash",
          37396: "SubjectArea",
          37386: "FocalLength",
          41483: "FlashEnergy",
          41484: "SpatialFrequencyResponse",
          41486: "FocalPlaneXResolution",
          41487: "FocalPlaneYResolution",
          41488: "FocalPlaneResolutionUnit",
          41492: "SubjectLocation",
          41493: "ExposureIndex",
          41495: "SensingMethod",
          41728: "FileSource",
          41729: "SceneType",
          41730: "CFAPattern",
          41985: "CustomRendered",
          41986: "ExposureMode",
          41987: "WhiteBalance",
          41988: "DigitalZoomRatio",
          41989: "FocalLengthIn35mmFilm",
          41990: "SceneCaptureType",
          41991: "GainControl",
          41992: "Contrast",
          41993: "Saturation",
          41994: "Sharpness",
          41995: "DeviceSettingDescription",
          41996: "SubjectDistanceRange",
          42016: "ImageUniqueID",
          42032: "CameraOwnerName",
          42033: "BodySerialNumber",
          42034: "LensSpecification",
          42035: "LensMake",
          42036: "LensModel",
          42037: "LensSerialNumber",
        },
        34853: {
          0: "GPSVersionID",
          1: "GPSLatitudeRef",
          2: "GPSLatitude",
          3: "GPSLongitudeRef",
          4: "GPSLongitude",
          5: "GPSAltitudeRef",
          6: "GPSAltitude",
          7: "GPSTimeStamp",
          8: "GPSSatellites",
          9: "GPSStatus",
          10: "GPSMeasureMode",
          11: "GPSDOP",
          12: "GPSSpeedRef",
          13: "GPSSpeed",
          14: "GPSTrackRef",
          15: "GPSTrack",
          16: "GPSImgDirectionRef",
          17: "GPSImgDirection",
          18: "GPSMapDatum",
          19: "GPSDestLatitudeRef",
          20: "GPSDestLatitude",
          21: "GPSDestLongitudeRef",
          22: "GPSDestLongitude",
          23: "GPSDestBearingRef",
          24: "GPSDestBearing",
          25: "GPSDestDistanceRef",
          26: "GPSDestDistance",
          27: "GPSProcessingMethod",
          28: "GPSAreaInformation",
          29: "GPSDateStamp",
          30: "GPSDifferential",
          31: "GPSHPositioningError",
        },
        40965: { 1: "InteroperabilityIndex" },
      }),
        (a.tags.ifd1 = a.tags),
        (a.stringValues = {
          ExposureProgram: {
            0: "Undefined",
            1: "Manual",
            2: "Normal program",
            3: "Aperture priority",
            4: "Shutter priority",
            5: "Creative program",
            6: "Action program",
            7: "Portrait mode",
            8: "Landscape mode",
          },
          MeteringMode: {
            0: "Unknown",
            1: "Average",
            2: "CenterWeightedAverage",
            3: "Spot",
            4: "MultiSpot",
            5: "Pattern",
            6: "Partial",
            255: "Other",
          },
          LightSource: {
            0: "Unknown",
            1: "Daylight",
            2: "Fluorescent",
            3: "Tungsten (incandescent light)",
            4: "Flash",
            9: "Fine weather",
            10: "Cloudy weather",
            11: "Shade",
            12: "Daylight fluorescent (D 5700 - 7100K)",
            13: "Day white fluorescent (N 4600 - 5400K)",
            14: "Cool white fluorescent (W 3900 - 4500K)",
            15: "White fluorescent (WW 3200 - 3700K)",
            17: "Standard light A",
            18: "Standard light B",
            19: "Standard light C",
            20: "D55",
            21: "D65",
            22: "D75",
            23: "D50",
            24: "ISO studio tungsten",
            255: "Other",
          },
          Flash: {
            0: "Flash did not fire",
            1: "Flash fired",
            5: "Strobe return light not detected",
            7: "Strobe return light detected",
            9: "Flash fired, compulsory flash mode",
            13: "Flash fired, compulsory flash mode, return light not detected",
            15: "Flash fired, compulsory flash mode, return light detected",
            16: "Flash did not fire, compulsory flash mode",
            24: "Flash did not fire, auto mode",
            25: "Flash fired, auto mode",
            29: "Flash fired, auto mode, return light not detected",
            31: "Flash fired, auto mode, return light detected",
            32: "No flash function",
            65: "Flash fired, red-eye reduction mode",
            69: "Flash fired, red-eye reduction mode, return light not detected",
            71: "Flash fired, red-eye reduction mode, return light detected",
            73: "Flash fired, compulsory flash mode, red-eye reduction mode",
            77: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
            79: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
            89: "Flash fired, auto mode, red-eye reduction mode",
            93: "Flash fired, auto mode, return light not detected, red-eye reduction mode",
            95: "Flash fired, auto mode, return light detected, red-eye reduction mode",
          },
          SensingMethod: {
            1: "Undefined",
            2: "One-chip color area sensor",
            3: "Two-chip color area sensor",
            4: "Three-chip color area sensor",
            5: "Color sequential area sensor",
            7: "Trilinear sensor",
            8: "Color sequential linear sensor",
          },
          SceneCaptureType: {
            0: "Standard",
            1: "Landscape",
            2: "Portrait",
            3: "Night scene",
          },
          SceneType: { 1: "Directly photographed" },
          CustomRendered: { 0: "Normal process", 1: "Custom process" },
          WhiteBalance: { 0: "Auto white balance", 1: "Manual white balance" },
          GainControl: {
            0: "None",
            1: "Low gain up",
            2: "High gain up",
            3: "Low gain down",
            4: "High gain down",
          },
          Contrast: { 0: "Normal", 1: "Soft", 2: "Hard" },
          Saturation: {
            0: "Normal",
            1: "Low saturation",
            2: "High saturation",
          },
          Sharpness: { 0: "Normal", 1: "Soft", 2: "Hard" },
          SubjectDistanceRange: {
            0: "Unknown",
            1: "Macro",
            2: "Close view",
            3: "Distant view",
          },
          FileSource: { 3: "DSC" },
          ComponentsConfiguration: {
            0: "",
            1: "Y",
            2: "Cb",
            3: "Cr",
            4: "R",
            5: "G",
            6: "B",
          },
          Orientation: {
            1: "Original",
            2: "Horizontal flip",
            3: "Rotate 180° CCW",
            4: "Vertical flip",
            5: "Vertical flip + Rotate 90° CW",
            6: "Rotate 90° CW",
            7: "Horizontal flip + Rotate 90° CW",
            8: "Rotate 90° CCW",
          },
        }),
        (a.getText = function (r) {
          var e = this.get(r);
          switch (r) {
            case "LightSource":
            case "Flash":
            case "MeteringMode":
            case "ExposureProgram":
            case "SensingMethod":
            case "SceneCaptureType":
            case "SceneType":
            case "CustomRendered":
            case "WhiteBalance":
            case "GainControl":
            case "Contrast":
            case "Saturation":
            case "Sharpness":
            case "SubjectDistanceRange":
            case "FileSource":
            case "Orientation":
              return this.stringValues[r][e];
            case "ExifVersion":
            case "FlashpixVersion":
              return e ? String.fromCharCode(e[0], e[1], e[2], e[3]) : void 0;
            case "ComponentsConfiguration":
              return e
                ? this.stringValues[r][e[0]] +
                    this.stringValues[r][e[1]] +
                    this.stringValues[r][e[2]] +
                    this.stringValues[r][e[3]]
                : void 0;
            case "GPSVersionID":
              return e ? e[0] + "." + e[1] + "." + e[2] + "." + e[3] : void 0;
          }
          return String(e);
        }),
        (a.getAll = function () {
          var r = {},
            e,
            o,
            d;
          for (e in this)
            Object.prototype.hasOwnProperty.call(this, e) &&
              ((o = this[e]),
              o && o.getAll
                ? (r[this.ifds[e].name] = o.getAll())
                : ((d = this.tags[e]), d && (r[d] = this.getText(d))));
          return r;
        }),
        (a.getName = function (r) {
          var e = this.tags[r];
          return typeof e == "object" ? this.ifds[r].name : e;
        }),
        (function () {
          var r = a.tags,
            e,
            o,
            d;
          for (e in r)
            if (Object.prototype.hasOwnProperty.call(r, e))
              if (((o = a.ifds[e]), o)) {
                d = r[e];
                for (e in d)
                  Object.prototype.hasOwnProperty.call(d, e) &&
                    (o.map[d[e]] = Number(e));
              } else a.map[r[e]] = Number(e);
        })();
    });
  })(J);
  var W = { exports: {} };
  (function (v) {
    (function (n) {
      v.exports ? n(L, T) : n(window.loadImage);
    })(function (n) {
      function a() {}
      (a.prototype.map = { ObjectName: 5 }),
        (a.prototype.types = {
          0: "Uint16",
          200: "Uint16",
          201: "Uint16",
          202: "binary",
        }),
        (a.prototype.get = function (t) {
          return this[t] || this[this.map[t]];
        });
      function r(t, i, s) {
        for (var c = "", l = i + s, h = i; h < l; h += 1)
          c += String.fromCharCode(t.getUint8(h));
        return c;
      }
      function e(t, i, s, c, l) {
        return i.types[t] === "binary"
          ? new Blob([s.buffer.slice(c, c + l)])
          : i.types[t] === "Uint16"
            ? s.getUint16(c)
            : r(s, c, l);
      }
      function o(t, i) {
        return t === void 0 ? i : t instanceof Array ? (t.push(i), t) : [t, i];
      }
      function d(t, i, s, c, l, h) {
        for (var u, f, w, b = i + s, p = i; p < b; )
          t.getUint8(p) === 28 &&
            t.getUint8(p + 1) === 2 &&
            ((w = t.getUint8(p + 2)),
            (!l || l[w]) &&
              (!h || !h[w]) &&
              ((f = t.getInt16(p + 3)),
              (u = e(w, c.iptc, t, p + 5, f)),
              (c.iptc[w] = o(c.iptc[w], u)),
              c.iptcOffsets && (c.iptcOffsets[w] = p))),
            (p += 1);
      }
      function g(t, i) {
        return t.getUint32(i) === 943868237 && t.getUint16(i + 4) === 1028;
      }
      function m(t, i) {
        var s = t.getUint8(i + 7);
        return s % 2 !== 0 && (s += 1), s === 0 && (s = 4), s;
      }
      (n.parseIptcData = function (t, i, s, c, l) {
        if (!l.disableIptc)
          for (var h = i + s; i + 8 < h; ) {
            if (g(t, i)) {
              var u = m(t, i),
                f = i + 8 + u;
              if (f > h) {
                console.log("Invalid IPTC data: Invalid segment offset.");
                break;
              }
              var w = t.getUint16(i + 6 + u);
              if (i + w > h) {
                console.log("Invalid IPTC data: Invalid segment size.");
                break;
              }
              (c.iptc = new a()),
                l.disableIptcOffsets || (c.iptcOffsets = new a()),
                d(
                  t,
                  f,
                  w,
                  c,
                  l.includeIptcTags,
                  l.excludeIptcTags || { 202: !0 },
                );
              return;
            }
            i += 1;
          }
      }),
        n.metaDataParsers.jpeg[65517].push(n.parseIptcData),
        (n.IptcMap = a);
    });
  })(W);
  var K = W.exports,
    Z = { exports: {} };
  (function (v) {
    (function (n) {
      v.exports ? n(L, K) : n(window.loadImage);
    })(function (n) {
      var a = n.IptcMap.prototype;
      (a.tags = {
        0: "ApplicationRecordVersion",
        3: "ObjectTypeReference",
        4: "ObjectAttributeReference",
        5: "ObjectName",
        7: "EditStatus",
        8: "EditorialUpdate",
        10: "Urgency",
        12: "SubjectReference",
        15: "Category",
        20: "SupplementalCategories",
        22: "FixtureIdentifier",
        25: "Keywords",
        26: "ContentLocationCode",
        27: "ContentLocationName",
        30: "ReleaseDate",
        35: "ReleaseTime",
        37: "ExpirationDate",
        38: "ExpirationTime",
        40: "SpecialInstructions",
        42: "ActionAdvised",
        45: "ReferenceService",
        47: "ReferenceDate",
        50: "ReferenceNumber",
        55: "DateCreated",
        60: "TimeCreated",
        62: "DigitalCreationDate",
        63: "DigitalCreationTime",
        65: "OriginatingProgram",
        70: "ProgramVersion",
        75: "ObjectCycle",
        80: "Byline",
        85: "BylineTitle",
        90: "City",
        92: "Sublocation",
        95: "State",
        100: "CountryCode",
        101: "Country",
        103: "OriginalTransmissionReference",
        105: "Headline",
        110: "Credit",
        115: "Source",
        116: "CopyrightNotice",
        118: "Contact",
        120: "Caption",
        121: "LocalCaption",
        122: "Writer",
        125: "RasterizedCaption",
        130: "ImageType",
        131: "ImageOrientation",
        135: "LanguageIdentifier",
        150: "AudioType",
        151: "AudioSamplingRate",
        152: "AudioSamplingResolution",
        153: "AudioDuration",
        154: "AudioOutcue",
        184: "JobID",
        185: "MasterDocumentID",
        186: "ShortDocumentID",
        187: "UniqueDocumentID",
        188: "OwnerID",
        200: "ObjectPreviewFileFormat",
        201: "ObjectPreviewFileVersion",
        202: "ObjectPreviewData",
        221: "Prefs",
        225: "ClassifyState",
        228: "SimilarityIndex",
        230: "DocumentNotes",
        231: "DocumentHistory",
        232: "ExifCameraInfo",
        255: "CatalogSets",
      }),
        (a.stringValues = {
          10: {
            0: "0 (reserved)",
            1: "1 (most urgent)",
            2: "2",
            3: "3",
            4: "4",
            5: "5 (normal urgency)",
            6: "6",
            7: "7",
            8: "8 (least urgent)",
            9: "9 (user-defined priority)",
          },
          75: { a: "Morning", b: "Both Morning and Evening", p: "Evening" },
          131: { L: "Landscape", P: "Portrait", S: "Square" },
        }),
        (a.getText = function (r) {
          var e = this.get(r),
            o = this.map[r],
            d = this.stringValues[o];
          return d ? d[e] : String(e);
        }),
        (a.getAll = function () {
          var r = {},
            e,
            o;
          for (e in this)
            Object.prototype.hasOwnProperty.call(this, e) &&
              ((o = this.tags[e]), o && (r[o] = this.getText(o)));
          return r;
        }),
        (a.getName = function (r) {
          return this.tags[r];
        }),
        (function () {
          var r = a.tags,
            e = a.map || {},
            o;
          for (o in r)
            Object.prototype.hasOwnProperty.call(r, o) && (e[r[o]] = Number(o));
        })();
    });
  })(Z);
  var z = { exports: {} };
  (function (v) {
    (function (n) {
      v.exports ? n(L, Y, T) : n(window.loadImage);
    })(function (n) {
      var a = n.transform,
        r = n.requiresCanvas,
        e = n.requiresMetaData,
        o = n.transformCoordinates,
        d = n.getTransformedOptions;
      (function (i) {
        if (i.global.document) {
          var s =
              "data:image/jpeg;base64,/9j/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAYAAAAAAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAAIAAwMBEQACEQEDEQH/xABRAAEAAAAAAAAAAAAAAAAAAAAKEAEBAQADAQEAAAAAAAAAAAAGBQQDCAkCBwEBAAAAAAAAAAAAAAAAAAAAABEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AG8T9NfSMEVMhQvoP3fFiRZ+MTHDifa/95OFSZU5OzRzxkyejv8ciEfhSceSXGjS8eSdLnZc2HDm4M3BxcXwH/9k=",
            c = document.createElement("img");
          (c.onload = function () {
            if (
              ((i.orientation = c.width === 2 && c.height === 3), i.orientation)
            ) {
              var l = i.createCanvas(1, 1, !0),
                h = l.getContext("2d");
              h.drawImage(c, 1, 1, 1, 1, 0, 0, 1, 1),
                (i.orientationCropBug =
                  h.getImageData(0, 0, 1, 1).data.toString() !==
                  "255,255,255,255");
            }
          }),
            (c.src = s);
        }
      })(n);
      function g(i, s) {
        var c = i && i.orientation;
        return (
          (c === !0 && !n.orientation) ||
          (c === 1 && n.orientation) ||
          ((!s || n.orientation) && c > 1 && c < 9)
        );
      }
      function m(i, s) {
        return i !== s && ((i === 1 && s > 1 && s < 9) || (i > 1 && i < 9));
      }
      function t(i, s) {
        if (s > 1 && s < 9)
          switch (i) {
            case 2:
            case 4:
              return s > 4;
            case 5:
            case 7:
              return s % 2 === 0;
            case 6:
            case 8:
              return s === 2 || s === 4 || s === 5 || s === 7;
          }
        return !1;
      }
      (n.requiresCanvas = function (i) {
        return g(i) || r.call(n, i);
      }),
        (n.requiresMetaData = function (i) {
          return g(i, !0) || e.call(n, i);
        }),
        (n.transform = function (i, s, c, l, h) {
          a.call(
            n,
            i,
            s,
            function (u, f) {
              if (f) {
                var w = n.orientation && f.exif && f.exif.get("Orientation");
                if (w > 4 && w < 9) {
                  var b = f.originalWidth,
                    p = f.originalHeight;
                  (f.originalWidth = p), (f.originalHeight = b);
                }
              }
              c(u, f);
            },
            l,
            h,
          );
        }),
        (n.getTransformedOptions = function (i, s, c) {
          var l = d.call(n, i, s),
            h = c.exif && c.exif.get("Orientation"),
            u = l.orientation,
            f = n.orientation && h;
          if ((u === !0 && (u = h), !m(u, f))) return l;
          var w = l.top,
            b = l.right,
            p = l.bottom,
            y = l.left,
            x = {};
          for (var S in l)
            Object.prototype.hasOwnProperty.call(l, S) && (x[S] = l[S]);
          if (
            ((x.orientation = u),
            ((u > 4 && !(f > 4)) || (u < 5 && f > 4)) &&
              ((x.maxWidth = l.maxHeight),
              (x.maxHeight = l.maxWidth),
              (x.minWidth = l.minHeight),
              (x.minHeight = l.minWidth),
              (x.sourceWidth = l.sourceHeight),
              (x.sourceHeight = l.sourceWidth)),
            f > 1)
          ) {
            switch (f) {
              case 2:
                (b = l.left), (y = l.right);
                break;
              case 3:
                (w = l.bottom), (b = l.left), (p = l.top), (y = l.right);
                break;
              case 4:
                (w = l.bottom), (p = l.top);
                break;
              case 5:
                (w = l.left), (b = l.bottom), (p = l.right), (y = l.top);
                break;
              case 6:
                (w = l.left), (b = l.top), (p = l.right), (y = l.bottom);
                break;
              case 7:
                (w = l.right), (b = l.top), (p = l.left), (y = l.bottom);
                break;
              case 8:
                (w = l.right), (b = l.bottom), (p = l.left), (y = l.top);
                break;
            }
            if (t(u, f)) {
              var A = w,
                E = b;
              (w = p), (b = y), (p = A), (y = E);
            }
          }
          switch (
            ((x.top = w), (x.right = b), (x.bottom = p), (x.left = y), u)
          ) {
            case 2:
              (x.right = y), (x.left = b);
              break;
            case 3:
              (x.top = p), (x.right = y), (x.bottom = w), (x.left = b);
              break;
            case 4:
              (x.top = p), (x.bottom = w);
              break;
            case 5:
              (x.top = y), (x.right = p), (x.bottom = b), (x.left = w);
              break;
            case 6:
              (x.top = b), (x.right = p), (x.bottom = y), (x.left = w);
              break;
            case 7:
              (x.top = b), (x.right = w), (x.bottom = y), (x.left = p);
              break;
            case 8:
              (x.top = y), (x.right = w), (x.bottom = b), (x.left = p);
              break;
          }
          return x;
        }),
        (n.transformCoordinates = function (i, s, c) {
          o.call(n, i, s, c);
          var l = s.orientation,
            h = n.orientation && c.exif && c.exif.get("Orientation");
          if (m(l, h)) {
            var u = i.getContext("2d"),
              f = i.width,
              w = i.height,
              b = f,
              p = w;
            switch (
              (((l > 4 && !(h > 4)) || (l < 5 && h > 4)) &&
                ((i.width = w), (i.height = f)),
              l > 4 && ((b = w), (p = f)),
              h)
            ) {
              case 2:
                u.translate(b, 0), u.scale(-1, 1);
                break;
              case 3:
                u.translate(b, p), u.rotate(Math.PI);
                break;
              case 4:
                u.translate(0, p), u.scale(1, -1);
                break;
              case 5:
                u.rotate(-0.5 * Math.PI), u.scale(-1, 1);
                break;
              case 6:
                u.rotate(-0.5 * Math.PI), u.translate(-b, 0);
                break;
              case 7:
                u.rotate(-0.5 * Math.PI), u.translate(-b, p), u.scale(1, -1);
                break;
              case 8:
                u.rotate(0.5 * Math.PI), u.translate(0, -p);
                break;
            }
            switch ((t(l, h) && (u.translate(b, p), u.rotate(Math.PI)), l)) {
              case 2:
                u.translate(f, 0), u.scale(-1, 1);
                break;
              case 3:
                u.translate(f, w), u.rotate(Math.PI);
                break;
              case 4:
                u.translate(0, w), u.scale(1, -1);
                break;
              case 5:
                u.rotate(0.5 * Math.PI), u.scale(1, -1);
                break;
              case 6:
                u.rotate(0.5 * Math.PI), u.translate(0, -w);
                break;
              case 7:
                u.rotate(0.5 * Math.PI), u.translate(f, -w), u.scale(-1, 1);
                break;
              case 8:
                u.rotate(-0.5 * Math.PI), u.translate(-f, 0);
                break;
            }
          }
        });
    });
  })(z);
  var ee = z.exports,
    te = L;
  const R = M(te);
  function ie(v) {
    navigator.clipboard.writeText(v);
  }
  function q(v) {
    return new URLSearchParams(window.location.search).get(v);
  }
  function N(v, n) {
    const r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let e = "";
    const o = new Uint32Array(v);
    crypto.getRandomValues(o);
    for (let d = 0; d < v; d++) e += r.charAt(o[d] % r.length);
    return e;
  }
  function re() {
    const a = Date.now(),
      e = (JSON.parse(localStorage.getItem(U)) || []).filter(
        (o) => a - o < 600 * 1e3,
      );
    return e.length < 10
      ? (e.push(a), localStorage.setItem(U, JSON.stringify(e)), !0)
      : !1;
  }
  function ae() {
    var m, t, i;
    const v = window.numeric_widget.product,
      n =
        ((m = window.numeric_widget.product) == null
          ? void 0
          : m.customImages) || [],
      a =
        ((t = window.numeric_widget.product) == null
          ? void 0
          : t.firstAvailableOrSelected) || null,
      r = "gid://shopify/ProductVariant",
      e = q("variant"),
      o = "https:" + (v == null ? void 0 : v.featured_image) + "&width=512";
    if (!e) {
      if (a) {
        const s = n.find((c) => c.id === `${r}/${a.id}`);
        return s ? s.url : o;
      }
      return o;
    }
    const d = v.variants.find((s) => s.id === parseInt(e));
    if (!d) return o;
    const g = n.find((s) => s.id === `${r}/${d.id}`);
    return g
      ? g.url
      : d.featured_image
        ? "https:" +
          ((i = d.featured_image) == null ? void 0 : i.src) +
          "&width=512"
        : o;
  }
  async function O(v, n = "GET", a = null, r = !1) {
    try {
      const e = a
          ? {
              body:
                a instanceof FormData || a instanceof File
                  ? a
                  : JSON.stringify(a),
              headers: r
                ? {}
                : {
                    "Content-Type":
                      a instanceof FormData
                        ? "multipart/form-data"
                        : "application/json",
                  },
            }
          : {},
        o = await fetch(v, {
          method: n,
          ...e,
          signal: window.numeric_widget.signal,
        });
      let d = null;
      try {
        d = await o.json();
      } catch {
        console.log("Error while parse JSON");
      }
      if (o.ok) return d;
      throw new Error(d == null ? void 0 : d.error);
    } catch (e) {
      return (
        console.log(e),
        {
          error:
            (e == null ? void 0 : e.message) ||
            "Something went wrong. Try again later.",
        }
      );
    }
  }
  async function P(v, n = null) {
    const a = se(v);
    let r = C;
    return n && (r += n), await O(r, "POST", a);
  }
  function se(v, n = !1, a = !1) {
    const r = window.numeric_widget.funnel_id,
      e = window.numeric_widget.product.id;
    if (n) {
      const o = new FormData();
      return (
        a === !1 && (o.set("funnel_id", r), o.set("product_id", e)),
        typeof v == "object" &&
          v &&
          Object.entries(v).forEach(([d, g]) => o.set(d, g)),
        o
      );
    }
    return { funnel_id: r, product_id: e, ...(v || {}) };
  }
  async function ne(v) {
    const n = ["image/jpeg", "image/png"];
    return new Promise((a, r) => {
      if (v.target.files && v.target.files[0]) {
        const e = v.target.files[0];
        if (!n.includes(e.type))
          return r({ error: "Please select a valid image file (JPEG, PNG)" });
        if (e.size / 1024 / 1024 > 10)
          return r({ error: "Max file size - 10 MB" });
        R(
          e,
          function (o, d) {
            if (o.type === "error")
              return r({ error: "Error loading image file" });
            "toBlob" in o
              ? o.toBlob(function (g) {
                  if (!d.imageHead) {
                    if (
                      (d == null ? void 0 : d.originalWidth) >=
                      (d == null ? void 0 : d.originalHeight)
                    )
                      return r({ error: "Please select a vertical image" });
                    a({ data: new File([g], "file", { type: "image/jpeg" }) });
                  }
                  d.exif &&
                    R.writeExifData(
                      d == null ? void 0 : d.imageHead,
                      "Orientation",
                      1,
                    ),
                    R.replaceHead(
                      g,
                      d == null ? void 0 : d.imageHead,
                      function (m) {
                        a({
                          data: new File([m], "file", { type: "image/jpeg" }),
                        });
                      },
                    );
                }, "image/jpeg")
              : r({
                  error:
                    "Unfortunately, your browser does not support this functionality. 😦. Please use another",
                });
          },
          { meta: !0, crop: !0, orientation: !0, aspectRatio: 9 / 16 },
        );
      } else r({ error: "No file selected" });
    })
      .then((a) => a)
      .catch((a) => a);
  }
  async function oe(v) {
    return v
      ? new Promise((n, a) => {
          const r = new FileReader();
          (r.onload = function (e) {
            n(e.target.result);
          }),
            (r.onerror = function (e) {
              console.error(e), n(null);
            }),
            r.readAsDataURL(v);
        })
          .then((n) => n)
          .catch((n) => n)
      : null;
  }
  async function le(v) {
    var r, e;
    const n = await P({ content_type: v.type }, "/presigned_url");
    if (!n)
      return {
        error: "Error when tried to upload your photo. Please try again",
      };
    if (n != null && n.error) return { error: n.error };
    const a = await O(n.data, "PUT", v, !0);
    return a != null && a.error
      ? { error: a.error }
      : (e = (r = n.data) == null ? void 0 : r.split("?")) == null
        ? void 0
        : e[0];
  }
  async function V(v) {
    return new Promise((n) => setTimeout(n, v));
  }
  /**
   * @preserve
   * Sharer.js
   *
   * @description Create your own social share buttons
   * @version 0.5.1
   * @author Ellison Leao <ellisonleao@gmail.com>
   * @license MIT
   *
   */ (function (v, n) {
    var a = function (r) {
      this.elem = r;
    };
    (a.init = function () {
      var r = n.querySelectorAll("[data-sharer]"),
        e,
        o = r.length;
      for (e = 0; e < o; e++) r[e].addEventListener("click", a.add);
    }),
      (a.add = function (r) {
        var e = r.currentTarget || r.srcElement,
          o = new a(e);
        o.share();
      }),
      (a.prototype = {
        constructor: a,
        getValue: function (r) {
          var e = this.elem.getAttribute("data-" + r);
          return (
            e && r === "hashtag" && (e.startsWith("#") || (e = "#" + e)),
            e === null ? "" : e
          );
        },
        share: function () {
          var r = this.getValue("sharer").toLowerCase(),
            e = {
              facebook: {
                shareUrl: "https://www.facebook.com/sharer/sharer.php",
                params: {
                  u: this.getValue("url"),
                  hashtag: this.getValue("hashtag"),
                  quote: this.getValue("quote"),
                },
              },
              linkedin: {
                shareUrl: "https://www.linkedin.com/shareArticle",
                params: { url: this.getValue("url"), mini: !0 },
              },
              twitter: {
                shareUrl: "https://twitter.com/intent/tweet",
                params: {
                  text: this.getValue("title"),
                  url: this.getValue("url"),
                  hashtags: this.getValue("hashtags"),
                  via: this.getValue("via"),
                  related: this.getValue("related"),
                  in_reply_to: this.getValue("in_reply_to"),
                },
              },
              x: {
                shareUrl: "https://x.com/intent/tweet",
                params: {
                  text: this.getValue("title"),
                  url: this.getValue("url"),
                  hashtags: this.getValue("hashtags"),
                  via: this.getValue("via"),
                  related: this.getValue("related"),
                  in_reply_to: this.getValue("in_reply_to"),
                },
              },
              threads: {
                shareUrl: "https://threads.net/intent/post",
                params: {
                  text: this.getValue("title") + " " + this.getValue("url"),
                },
              },
              email: {
                shareUrl: "mailto:" + this.getValue("to"),
                params: {
                  subject: this.getValue("subject"),
                  body:
                    this.getValue("title") +
                    `
` +
                    this.getValue("url"),
                },
              },
              whatsapp: {
                shareUrl:
                  this.getValue("web") === "true"
                    ? "https://web.whatsapp.com/send"
                    : "https://wa.me/",
                params: {
                  phone: this.getValue("to"),
                  text: this.getValue("title") + " " + this.getValue("url"),
                },
              },
              telegram: {
                shareUrl: "https://t.me/share",
                params: {
                  text: this.getValue("title"),
                  url: this.getValue("url"),
                },
              },
              viber: {
                shareUrl: "viber://forward",
                params: {
                  text: this.getValue("title") + " " + this.getValue("url"),
                },
              },
              line: {
                shareUrl:
                  "http://line.me/R/msg/text/?" +
                  encodeURIComponent(
                    this.getValue("title") + " " + this.getValue("url"),
                  ),
              },
              pinterest: {
                shareUrl: "https://www.pinterest.com/pin/create/button/",
                params: {
                  url: this.getValue("url"),
                  media: this.getValue("image"),
                  description: this.getValue("description"),
                },
              },
              tumblr: {
                shareUrl: "http://tumblr.com/widgets/share/tool",
                params: {
                  canonicalUrl: this.getValue("url"),
                  content: this.getValue("url"),
                  posttype: "link",
                  title: this.getValue("title"),
                  caption: this.getValue("caption"),
                  tags: this.getValue("tags"),
                },
              },
              hackernews: {
                shareUrl: "https://news.ycombinator.com/submitlink",
                params: { u: this.getValue("url"), t: this.getValue("title") },
              },
              reddit: {
                shareUrl: "https://www.reddit.com/submit",
                params: {
                  url: this.getValue("url"),
                  title: this.getValue("title"),
                },
              },
              vk: {
                shareUrl: "http://vk.com/share.php",
                params: {
                  url: this.getValue("url"),
                  title: this.getValue("title"),
                  description: this.getValue("caption"),
                  image: this.getValue("image"),
                },
              },
              xing: {
                shareUrl: "https://www.xing.com/social/share/spi",
                params: { url: this.getValue("url") },
              },
              buffer: {
                shareUrl: "https://buffer.com/add",
                params: {
                  url: this.getValue("url"),
                  title: this.getValue("title"),
                  via: this.getValue("via"),
                  picture: this.getValue("picture"),
                },
              },
              instapaper: {
                shareUrl: "http://www.instapaper.com/edit",
                params: {
                  url: this.getValue("url"),
                  title: this.getValue("title"),
                  description: this.getValue("description"),
                },
              },
              pocket: {
                shareUrl: "https://getpocket.com/save",
                params: { url: this.getValue("url") },
              },
              mashable: {
                shareUrl: "https://mashable.com/submit",
                params: {
                  url: this.getValue("url"),
                  title: this.getValue("title"),
                },
              },
              mix: {
                shareUrl: "https://mix.com/add",
                params: { url: this.getValue("url") },
              },
              flipboard: {
                shareUrl: "https://share.flipboard.com/bookmarklet/popout",
                params: {
                  v: 2,
                  title: this.getValue("title"),
                  url: this.getValue("url"),
                  t: Date.now(),
                },
              },
              weibo: {
                shareUrl: "http://service.weibo.com/share/share.php",
                params: {
                  url: this.getValue("url"),
                  title: this.getValue("title"),
                  pic: this.getValue("image"),
                  appkey: this.getValue("appkey"),
                  ralateUid: this.getValue("ralateuid"),
                  language: "zh_cn",
                },
              },
              blogger: {
                shareUrl: "https://www.blogger.com/blog-this.g",
                params: {
                  u: this.getValue("url"),
                  n: this.getValue("title"),
                  t: this.getValue("description"),
                },
              },
              baidu: {
                shareUrl: "http://cang.baidu.com/do/add",
                params: {
                  it: this.getValue("title"),
                  iu: this.getValue("url"),
                },
              },
              douban: {
                shareUrl: "https://www.douban.com/share/service",
                params: {
                  name: this.getValue("name"),
                  href: this.getValue("url"),
                  image: this.getValue("image"),
                  comment: this.getValue("description"),
                },
              },
              okru: {
                shareUrl: "https://connect.ok.ru/dk",
                params: {
                  "st.cmd": "WidgetSharePreview",
                  "st.shareUrl": this.getValue("url"),
                  title: this.getValue("title"),
                },
              },
              mailru: {
                shareUrl: "http://connect.mail.ru/share",
                params: {
                  share_url: this.getValue("url"),
                  linkname: this.getValue("title"),
                  linknote: this.getValue("description"),
                  type: "page",
                },
              },
              evernote: {
                shareUrl: "https://www.evernote.com/clip.action",
                params: {
                  url: this.getValue("url"),
                  title: this.getValue("title"),
                },
              },
              skype: {
                shareUrl: "https://web.skype.com/share",
                params: {
                  url: this.getValue("url"),
                  title: this.getValue("title"),
                },
              },
              delicious: {
                shareUrl: "https://del.icio.us/post",
                params: {
                  url: this.getValue("url"),
                  title: this.getValue("title"),
                },
              },
              sms: {
                shareUrl: "sms://",
                params: { body: this.getValue("body") },
              },
              trello: {
                shareUrl: "https://trello.com/add-card",
                params: {
                  url: this.getValue("url"),
                  name: this.getValue("title"),
                  desc: this.getValue("description"),
                  mode: "popup",
                },
              },
              messenger: {
                shareUrl: "fb-messenger://share",
                params: { link: this.getValue("url") },
              },
              odnoklassniki: {
                shareUrl: "https://connect.ok.ru/dk",
                params: {
                  st: {
                    cmd: "WidgetSharePreview",
                    deprecated: 1,
                    shareUrl: this.getValue("url"),
                  },
                },
              },
              meneame: {
                shareUrl: "https://www.meneame.net/submit",
                params: { url: this.getValue("url") },
              },
              diaspora: {
                shareUrl: "https://share.diasporafoundation.org",
                params: {
                  title: this.getValue("title"),
                  url: this.getValue("url"),
                },
              },
              googlebookmarks: {
                shareUrl: "https://www.google.com/bookmarks/mark",
                params: {
                  op: "edit",
                  bkmk: this.getValue("url"),
                  title: this.getValue("title"),
                },
              },
              qzone: {
                shareUrl:
                  "https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey",
                params: { url: this.getValue("url") },
              },
              refind: {
                shareUrl: "https://refind.com",
                params: { url: this.getValue("url") },
              },
              surfingbird: {
                shareUrl: "https://surfingbird.ru/share",
                params: {
                  url: this.getValue("url"),
                  title: this.getValue("title"),
                  description: this.getValue("description"),
                },
              },
              yahoomail: {
                shareUrl: "http://compose.mail.yahoo.com",
                params: {
                  to: this.getValue("to"),
                  subject: this.getValue("subject"),
                  body: this.getValue("body"),
                },
              },
              wordpress: {
                shareUrl: "https://wordpress.com/wp-admin/press-this.php",
                params: {
                  u: this.getValue("url"),
                  t: this.getValue("title"),
                  s: this.getValue("title"),
                },
              },
              amazon: {
                shareUrl: "https://www.amazon.com/gp/wishlist/static-add",
                params: { u: this.getValue("url"), t: this.getValue("title") },
              },
              pinboard: {
                shareUrl: "https://pinboard.in/add",
                params: {
                  url: this.getValue("url"),
                  title: this.getValue("title"),
                  description: this.getValue("description"),
                },
              },
              threema: {
                shareUrl: "threema://compose",
                params: {
                  text: this.getValue("text"),
                  id: this.getValue("id"),
                },
              },
              kakaostory: {
                shareUrl: "https://story.kakao.com/share",
                params: { url: this.getValue("url") },
              },
              yummly: {
                shareUrl: "http://www.yummly.com/urb/verify",
                params: {
                  url: this.getValue("url"),
                  title: this.getValue("title"),
                  yumtype: "button",
                },
              },
            },
            o = e[r];
          return (
            o &&
              ((o.width = this.getValue("width")),
              (o.height = this.getValue("height"))),
            o !== void 0 ? this.urlSharer(o) : !1
          );
        },
        urlSharer: function (r) {
          var e = r.params || {},
            o = Object.keys(e),
            d,
            g = o.length > 0 ? "?" : "";
          for (d = 0; d < o.length; d++)
            g !== "?" && (g += "&"),
              e[o[d]] && (g += o[d] + "=" + encodeURIComponent(e[o[d]]));
          r.shareUrl += g;
          var m = this.getValue("link") === "true",
            t = this.getValue("blank") === "true";
          if (m)
            t ? v.open(r.shareUrl, "_blank") : (v.location.href = r.shareUrl);
          else {
            console.log(r.shareUrl);
            var i = r.width || 600,
              s = r.height || 480,
              c = v.innerWidth / 2 - i / 2 + v.screenX,
              l = v.innerHeight / 2 - s / 2 + v.screenY,
              h =
                "scrollbars=no, width=" +
                i +
                ", height=" +
                s +
                ", top=" +
                l +
                ", left=" +
                c,
              u = v.open(r.shareUrl, "", h);
            v.focus && u.focus();
          }
        },
      }),
      n.readyState === "complete" || n.readyState !== "loading"
        ? a.init()
        : n.addEventListener("DOMContentLoaded", a.init),
      (v.Sharer = a);
  })(window, document);
  class ue extends HTMLElement {
    constructor() {
      const {
          modal_text_virtual: a,
          modal_text_encouragement: r,
          modal_button_text: e,
          modal_button_behaviour: o,
          modal_text: d,
          modal_text_2: g,
          modal_bgcolor: m,
          modal_text_color: t,
          modal_button_bgcolor: i,
          modal_frame_color: s,
          modal_input_image: c,
          modal_border_radius: l,
          button_text_color: h,
          button_bgcolor: u,
          modal_header_text_color: f,
          modal_text_header_recommendations: w,
          modal_text_recommendations: b,
          button_border_radius: p,
        } = window.numeric_widget.settings,
        { sharedOptionsEnabled: y, sharedOptions: x } = window.numeric_widget,
        S = window.numeric_widget.upload_ico_src;
      super();
      k(this, "types", {
        email: "email",
        phone: "phone",
        phoneEmail: "phone+email",
      });
      k(this, "abortController");
      k(this, "timer");
      k(this, "imageLoaderInterval");
      k(this, "discountCode");
      k(this, "modalId");
      k(this, "modalBlock");
      k(this, "imageUrl");
      k(this, "imageId");
      k(this, "tryOnUuid");
      k(this, "backgroundImage");
      k(this, "sharedOptionsEnabled");
      k(this, "sharedOptions");
      k(this, "modalButtonBehaviour");
      this.modalButtonBehaviour = o;
      const A = document.createElement("div");
      (A.innerHTML = `
      <style>
        :root {
          --widget-button-border-radius: ${p}px;
          --widget-button-bgcolor: ${u};
          --widget-button-text-color: ${h};

          --widget-popup-header-text-color: ${f};
          --widget-popup-frame-color: ${s};
          --widget-popup-bgcolor: ${m};
          --widget-popup-button-bgcolor: ${i};
          --widget-popup-text-color: ${t};
          --widget-popup-border-radius: ${l}px;
        }
      </style>
      <div class="widget-popup">
        <div class="widget-popup-content">
          <div class="widget-header-wrapper">
            <div class="widget-header">
              <p class="widget-popup-header">${a}</p>
              <span class="widget-popup-close">&times;</span>
            </div>
          </div>
          <div class="widget-body">
            <div class="widget-step widget-step-upload widget-active">
              <div class='widget-image-upload'>
                <div class="widget-upload-container">
                  <div class="widget-file-drop-area">
                    <svg width="100" height="100" viewBox="0 0 101 101" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                      <rect x="0.685547" y="0.214844" width="100" height="100" fill="url(#pattern0_980_8056)"/>
                      <defs>
                      <pattern id="pattern0_980_8056" patternContentUnits="objectBoundingBox" width="1" height="1">
                      <use xlink:href="#image0_980_8056" transform="scale(0.002)"/>
                      </pattern>
                      <image id="image0_980_8056" width="500" height="500" xlink:href="${c ?? S}"/>
                      </defs>
                    </svg>
                    <span class="widget-file-msg desktop">Drag your image file here or
                        <span id="widget-uploadButton desktop" class="widget-fake-btn">click here</span>
                        to select
                    </span>
                    <span class="widget-file-msg mobile">
                        <span id="widget-uploadButton mobile" class="widget-fake-btn">Click here</span>
                        to select your image
                    </span>
                    <input id="widget-uploadInput" accept="image/*" class="widget-file-input" type="file">
                  </div>
                  <span id='widget-errorUpload' class='widget-error widget-hidden'></span>
                </div>
                <div class="widget-image-upload-recommendations">
                    <p class="widget-recommendation-header">
                    ${w}
                    </p>
                    <ul>
                    ${b
                      .split(
                        `
`,
                      )
                      .map(
                        (E) => `
                      <li class="widget-recommendation">${E.trim()}</li>
                    `,
                      )
                      .join("")}
                    </ul>
                </div>
              </div>
            </div>
            <div class="widget-step widget-step-loader">
              <span class="widget-loader-wrapper">
                <span class="widget-loader-percent">0%</span>
                <span class="widget-loader"></span>
              </span>
               <span class="widget-image-animation hidden">
                <span class="widget-image-animation-container">
                  <img id="widget-image-animated-1" src="" alt='image-animated-1'/>
                  <img id="widget-image-animated-2" src="" alt='image-animated-2'/>
                  </span>
                </span>
              <p>Getting you dressed</p>
              <span class="widget-background-image"></span>
            </div>
            <div class="widget-step widget-step-result">
              <div class="widget-left-block">
                <img class="widget-result-image" src=${I} alt="result-image"/>
                <div class="widget-result-text">
                  <p>${r}</p>
                </div>
              </div>
              <div class="widget-right-block">
                <div class="widget-result-container">
                  <div class="widget-content-stage-1">
                     ${
                       y && x.includes("shareApps")
                         ? `<div class="widget-share-apps-wrapper">
                        <label>
                          ${g}
                        </label>
                        <div id="widget-share-apps" class="widget-share-apps"></div>
                    </div>`
                         : ""
                     }
                     ${
                       y && x.includes("shareEmail")
                         ? `<div class="widget-share-email">
                        <div>
                          <input id="widget-result-text-checkbox" type="checkbox">
                          <label for="widget-result-text-checkbox">
                          ${d}
                          </label>
                        </div>
                        <div class="widget-inputs widget-hidden">
                            <div class="widget-input-block">
                              <label>Friend email</label>
                              <input required id='widget-friends_data_1' placeholder="Enter friend email"></input>
                              <span class='widget-error widget-friends_data_1 widget-hidden'>Enter valid email</span>
                            </div>
                            <div class="widget-input-block">
                              <label>Friend email</label>
                              <input required id='widget-friends_data_2' placeholder="Enter friend email"></input>
                              <span class='widget-error widget-friends_data_2 widget-hidden'>Enter valid email</span>
                            </div>
                            <div class="widget-input-block">
                              <label>Your email</label>
                              <input required id='widget-your_email' placeholder="Enter your email"/>
                              <span class='widget-error widget-your_email widget-hidden'>Enter valid email</span>
                            </div>
                          </div>
                        <button id="widget-submitButton" class="widget-hidden">Send</button>
                      </div>`
                         : ""
                     }
                  </div>
                  <div class="widget-content-stage-2">
                   <button id="widget-result-action-button">${e}</button>
                   ${
                     y && x.length > 0
                       ? `<div class="widget-discount-block">
                    <label>Your discount code:</label>
                    <div class="widget-discount-block-content">
                      <span id="widget-discount-code"></span>
                      <span id="widget-copy">
                        <?xml version="1.0" encoding="utf-8"?>
                        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 5.00005C7.01165 5.00082 6.49359 5.01338 6.09202 5.21799C5.71569 5.40973 5.40973 5.71569 5.21799 6.09202C5 6.51984 5 7.07989 5 8.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.07989 21 8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V8.2C19 7.07989 19 6.51984 18.782 6.09202C18.5903 5.71569 18.2843 5.40973 17.908 5.21799C17.5064 5.01338 16.9884 5.00082 16 5.00005M8 5.00005V7H16V5.00005M8 5.00005V4.70711C8 4.25435 8.17986 3.82014 8.5 3.5C8.82014 3.17986 9.25435 3 9.70711 3H14.2929C14.7456 3 15.1799 3.17986 15.5 3.5C15.8201 3.82014 16 4.25435 16 4.70711V5.00005" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </span>
                    </div>
                   </div>`
                       : ""
                   }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `),
        document.body.append(A),
        (this.modalBlock = A.querySelector(".widget-popup")),
        (this.abortController = new AbortController()),
        (this.timer = 0),
        (this.imageLoaderInterval = 0),
        (this.discountCode = ""),
        (this.modalId = -1),
        (this.imageUrl = ""),
        (this.imageId = -1),
        (this.tryOnUuid = ""),
        (this.backgroundImage = ""),
        (this.sharedOptionsEnabled = y),
        (this.sharedOptions = x);
    }
    connectedCallback() {
      const a = this.querySelector(".widget-button");
      (this.openModal = this.openModal.bind(this)),
        a.addEventListener("click", this.openModal);
      const r = this.modalBlock.querySelector(".widget-popup-close");
      (this.closeModal = this.closeModal.bind(this)),
        r.addEventListener("click", this.closeModal),
        (this.handleOutsideClick = this.handleOutsideClick.bind(this));
      const e = this.modalBlock.querySelector("#widget-uploadInput");
      e.addEventListener("change", this.handleFileUpload.bind(this));
      const o = this.modalBlock.querySelector(".widget-file-drop-area");
      if (
        (e.addEventListener("dragenter", function () {
          o.classList.add("is-active");
        }),
        e.addEventListener("dragleave", function () {
          o.classList.remove("is-active");
        }),
        e.addEventListener("focus", function () {
          o.classList.add("is-active");
        }),
        e.addEventListener("blur", function () {
          o.classList.remove("is-active");
        }),
        e.addEventListener("click", function () {
          o.classList.add("is-active");
        }),
        e.addEventListener("drop", function () {
          o.classList.remove("is-active");
        }),
        this.sharedOptionsEnabled && this.sharedOptions.length > 0)
      ) {
        if (this.sharedOptions.includes("shareEmail")) {
          const m = this.modalBlock.querySelector(
            "#widget-result-text-checkbox",
          );
          (this.handleCheckbox = this.handleCheckbox.bind(this)),
            m.addEventListener("change", this.handleCheckbox);
          const t = this.modalBlock.querySelector("#widget-submitButton");
          (this.handleSubmit = this.handleSubmit.bind(this)),
            t.addEventListener("click", this.handleSubmit);
          const i = this.modalBlock.querySelector("#widget-friends_data_1"),
            s = this.modalBlock.querySelector("#widget-friends_data_2"),
            c = this.modalBlock.querySelector("#widget-your_email"),
            l = "widget-friends_data_1",
            h = "widget-friends_data_2",
            u = "widget-your_email";
          i.addEventListener("blur", () =>
            this.validateInput(l, this.types.email, [h, u]),
          ),
            s.addEventListener("blur", () =>
              this.validateInput(h, this.types.email, [l, u]),
            ),
            c.addEventListener("blur", () =>
              this.validateInput(u, this.types.email, [l, h]),
            );
        }
        const g = this.modalBlock.querySelector("#widget-copy");
        (this.handleCopy = this.handleCopy.bind(this)),
          g.addEventListener("click", this.handleCopy);
      }
      const d = this.modalBlock.querySelector("#widget-result-action-button");
      (this.handleResultButton = this.handleResultButton.bind(this)),
        d.addEventListener("click", this.handleResultButton);
    }
    async openModal() {
      this.setLoaderPercent(0),
        document.body.classList.add("widget-disabled-scroll"),
        (this.abortController = new AbortController()),
        (this.modalBlock = document.body.querySelector(".widget-popup")),
        (window.numeric_widget.signal = this.abortController.signal),
        window.numeric_widget.environment !== "sandbox" &&
          (await P({ event_name: "click" }, "/event")),
        (this.discountCode = ""),
        (this.modalId = new Date().valueOf()),
        this.showUpload(),
        (this.modalBlock.style.display = "flex"),
        (this.handleOutsideClick = this.handleOutsideClick.bind(this)),
        window.addEventListener("click", this.handleOutsideClick);
    }
    closeModal() {
      this.stopTimer(),
        this.stopImageLoader(),
        document.body.classList.remove("widget-disabled-scroll"),
        (this.modalBlock.style.display = "none"),
        this.abortController.abort(),
        (window.numeric_widget.signal = null),
        window.removeEventListener("click", this.handleOutsideClick),
        this.resetModalState();
    }
    handleCheckbox(a) {
      const r = this.modalBlock.querySelector(".widget-inputs"),
        e = this.modalBlock.querySelector("#widget-submitButton");
      a.target.checked
        ? (r.classList.remove("widget-hidden"),
          e.classList.remove("widget-hidden"))
        : (r.classList.add("widget-hidden"), e.classList.add("widget-hidden"));
    }
    handleOutsideClick(a) {
      a.target === this.modalBlock && this.closeModal();
    }
    async handleResultButton(a) {
      if (window.numeric_widget.environment === "sandbox") return;
      const r = window.numeric_widget.product,
        e = window.numeric_widget.shopUrl;
      a.target.setAttribute("disabled", !0);
      const o = q("variant");
      let d = o ? parseInt(o) : r.variants[0].id;
      this.discountCode !== "" &&
        (await O(`${e}/discount/${this.discountCode}`, "GET"));
      const g = window.numeric_widget.funnel_id,
        t = await O("/cart/add.js", "POST", {
          id: d,
          quantity: 1,
          properties: { "__widget-funnel_id": g },
        });
      if (!(t != null && t.error))
        switch (this.modalButtonBehaviour) {
          case "cart":
            window.location.href = `${e}/cart`;
            return;
          case "checkout":
            window.location.href = `${e}/checkout`;
            return;
        }
      a.target.setAttribute("disabled", !1);
    }
    async handleFileUpload(a) {
      this.showLoader("Validating your file...", null, !0);
      const r = await ne(a);
      if ("error" in r) return this.showUpload(r.error);
      const e = await oe(r.data);
      if (!e) return this.showUpload("File not provided");
      if (
        ((this.backgroundImage = e),
        this.showLoader(
          "Nice picture! Uploading now...",
          this.backgroundImage,
          !0,
        ),
        !re())
      )
        return this.showUpload(
          "You have reached your limit of 3 try ons! Come back soon to try more.",
        );
      const o = await le(r.data);
      if (o != null && o.error) return this.showUpload(o.error);
      this.showLoader("Sending to our server...", this.backgroundImage, !0),
        await this.generateImage(o);
    }
    async handleSubmit() {
      const a = "widget-friends_data_1",
        r = "widget-friends_data_2",
        e = "widget-your_email",
        o = this.validateInput(a, this.types.email, [r, e]),
        d = this.validateInput(r, this.types.email, [a, e]),
        g = this.validateInput(e, this.types.email, [r, a]);
      if (!o || !g || !d) return;
      if (
        (this.showLoader("Sending your friends a discount...", null, !0),
        window.numeric_widget.environment === "sandbox")
      )
        return (
          await V(2e3),
          (this.discountCode = "ANTLA-SANDBOX"),
          this.showEmailSend()
        );
      const m = await P(
        {
          email: g,
          data_users: [o, d],
          imageId: this.imageId,
          tryOnUuid: this.tryOnUuid,
          shareMethod: "shareEmail",
        },
        "/submit",
      );
      if (m != null && m.error) return console.log(m.error), this.showResult();
      (this.discountCode = m.data.discountCode),
        this.modalBlock.querySelectorAll(".widget-error").forEach((i) => {
          i.innerHTML = "";
        }),
        this.showEmailSend();
    }
    showResult() {
      this.hideSteps();
      const a = this.modalBlock.querySelector(".widget-step-result");
      a.classList.remove("widget-stage-2"), a.classList.add("widget-stage-1");
      const r = a.querySelector("img");
      (r.src = this.imageUrl), a.classList.add("widget-active");
    }
    showEmailSend() {
      var m, t, i, s, c, l, h;
      this.hideSteps();
      const a = this.modalBlock.querySelector(".widget-step-result"),
        r = a.querySelector("#widget-discount-code"),
        e = a.querySelector("#widget-result-action-button"),
        o = a.querySelector("img");
      o.src = this.imageUrl;
      const d = q("variant");
      (
        d
          ? (i =
              (t =
                (m = window.numeric_widget.product) == null
                  ? void 0
                  : m.variants) == null
                ? void 0
                : t.find((u) => u.id === parseInt(d))) == null
            ? void 0
            : i.available
          : ((l =
              (c =
                (s = window.numeric_widget.product) == null
                  ? void 0
                  : s.variants) == null
                ? void 0
                : c[0]) == null
              ? void 0
              : l.available) || !1
      )
        ? (e.removeAttribute("disabled"),
          (e.innerHTML =
            (h = window.numeric_widget.settings) == null
              ? void 0
              : h.modal_button_text))
        : (e.setAttribute("disabled", ""), (e.innerHTML = "Sold out")),
        r && (r.innerHTML = this.discountCode),
        a.classList.remove("widget-stage-1"),
        a.classList.add("widget-stage-2"),
        a.classList.add("widget-active");
    }
    handleCopy(a) {
      ie(this.discountCode),
        this.modalBlock
          .querySelector("#widget-copy")
          .classList.add("widget-copied");
    }
    async handleClickSocial() {
      const a = window.numeric_widget.environment === "sandbox";
      if ((this.showLoader("", null, !0), await V(a ? 1e3 : 15e3), a))
        return (
          await V(2e3),
          (this.discountCode = "ANTLA-SANDBOX"),
          this.showEmailSend()
        );
      const r = await P(
        {
          email: `${N(6)}_${new Date().valueOf()}`,
          data_users: [`${N(6)}_${new Date().valueOf()}`],
          imageId: this.imageId,
          tryOnUuid: this.tryOnUuid,
          shareMethod: "shareApps",
        },
        "/submit",
      );
      if (r != null && r.error) return console.log(r.error), this.showResult();
      (this.discountCode = r.data.discountCode), this.showEmailSend();
    }
    async generateImage(a) {
      const r = ae();
      this.animateImageLoader(a, r);
      const e = await P({ imageLink: a, productImage: r }, "/generate");
      if (e != null && e.error)
        return this.stopImageLoader(), this.showUpload(e.error);
      const o = e.data,
        d = o.uuid,
        g = o.eta;
      return (
        this.startTimer(g),
        this.showLoader("Generating your image...", this.backgroundImage),
        await this.checkImageGeneration(d, this.modalId)
      );
    }
    async checkImageGeneration(a, r) {
      let e = 1;
      const o = 20,
        d = 1e4,
        g = async () => {
          var i, s, c, l;
          if (this.modalId !== r) return;
          if (e > o)
            return (
              this.stopImageLoader(),
              this.stopTimer(),
              this.showUpload("Timeout. Try again please.")
            );
          const m = await P({ track_id: a }, "/pulling");
          if (m != null && m.error)
            return (
              this.stopImageLoader(), this.stopTimer(), this.showUpload(m.error)
            );
          const t = m.data;
          return (
            t.status === "SUCCESS" &&
              (this.stopTimer(),
              this.setLoaderPercent(100),
              (this.imageUrl = (i = t.data) == null ? void 0 : i.data),
              (this.imageId = (s = t.data) == null ? void 0 : s.imageId),
              (this.tryOnUuid = (c = t.data) == null ? void 0 : c.tryOnUuid),
              this.stopImageLoader(),
              await V(1e3)),
            t.status === "ERROR"
              ? (this.stopImageLoader(),
                this.stopTimer(),
                this.showUpload((l = t.data) == null ? void 0 : l.error))
              : (await V(d), e++, await g())
          );
        };
      await g();
    }
    validateInput(a, r, e, o = !1) {
      const d = this.types,
        g = this.modalBlock.querySelector(`#${a}`),
        m = e.map((h) => this.modalBlock.querySelector(`#${h}`).value);
      if (!g) return null;
      const t = g.value.trim(),
        i = this.modalBlock.querySelector(`.widget-error.${a}`);
      if (!i) return null;
      function s(h, u) {
        u.innerHTML = h;
      }
      function c(h, u) {
        return u.some((f) => f.trim() === h.trim());
      }
      function l(h, u) {
        const f =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          w =
            /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
        if (r === u.email) {
          if (!f.test(h))
            return (
              s(
                o
                  ? "Some values are not valid email format"
                  : "Invalid email format",
                i,
              ),
              i.classList.remove("widget-hidden"),
              !1
            );
        } else if (r === u.phone) {
          if (!w.test(h))
            return (
              s(
                o
                  ? "Some values are not valid phone format"
                  : "Invalid phone format",
                i,
              ),
              i.classList.remove("widget-hidden"),
              !1
            );
        } else if (r === u.phoneEmail) {
          if (!f.test(h) && !w.test(h))
            return (
              s(
                o
                  ? "Some values are not valid email/phone format"
                  : "Invalid email/phone format",
                i,
              ),
              i.classList.remove("widget-hidden"),
              !1
            );
        } else return null;
        return c(t, m)
          ? (s("Value is duplicate", i),
            i.classList.remove("widget-hidden"),
            !1)
          : !0;
      }
      if (t === "" || t === null)
        return (
          s("Value can't be empty", i), i.classList.remove("widget-hidden"), !1
        );
      if (o) {
        const h = t
          .split(
            `
`,
          )
          .filter((u) => !!u.length);
        if (h.length < 1 || h.length > 10)
          return (
            s("Total count of values must be in range 1 - 10", i),
            i.classList.remove("widget-hidden"),
            !1
          );
        for (const u of h) {
          const f = l(u, d);
          if (!f) return f;
        }
        return i.classList.add("widget-hidden"), h;
      } else {
        const h = l(t, d);
        return (
          console.log(h),
          h
            ? (console.log("da"), i.classList.add("widget-hidden"), t)
            : (console.log(h, "r"), h)
        );
      }
    }
    showUpload(a) {
      this.hideSteps();
      const r = this.modalBlock.querySelector("#widget-errorUpload");
      if (a) {
        const o = this.modalBlock.querySelector("#widget-uploadInput");
        (o.value = ""), (r.innerHTML = a), r.classList.remove("widget-hidden");
      } else r.classList.add("widget-hidden");
      this.modalBlock
        .querySelector(".widget-step-upload")
        .classList.add("widget-active");
    }
    animateImageLoader(a, r) {
      this.modalBlock
        .querySelector(".widget-image-animation")
        .classList.remove("hidden");
      let o = 0;
      const d = this.modalBlock.querySelector("#widget-image-animated-1"),
        g = this.modalBlock.querySelector("#widget-image-animated-2");
      (d.src = a), (g.src = r);
      function m() {
        o += 0.02;
        const t = 25,
          i = 50,
          s = 50,
          c = Math.floor(i + t * Math.cos(o + 90)),
          l = Math.floor(s + t * Math.sin(o + 90)),
          h = Math.floor(i + -(t * Math.cos(o + 90))),
          u = Math.floor(s + -(t * Math.sin(o + 90)));
        (d.style.top = l + "px"),
          (d.style.left = c + "px"),
          (g.style.top = u + "px"),
          (g.style.left = h + "px");
      }
      this.imageLoaderInterval = window.setInterval(m, 10);
    }
    stopImageLoader() {
      this.modalBlock
        .querySelector(".widget-image-animation")
        .classList.add("hidden"),
        clearInterval(this.imageLoaderInterval);
    }
    setLoaderPercent(a) {
      const e = this.modalBlock
        .querySelector(".widget-step-loader")
        .querySelector(".widget-loader-percent");
      e.innerHTML = `${a}%`;
    }
    startTimer(a) {
      const r = a;
      let e = 0;
      this.stopTimer();
      const o = window.setInterval(() => {
        const d = Math.round((e / r) * 100);
        e++,
          e === 10 &&
            this.showLoader("Getting you dressed...", this.backgroundImage),
          e === 20 &&
            this.showLoader("Oh you look nice...", this.backgroundImage),
          e === 30 && this.showLoader("Final touches...", this.backgroundImage),
          e === 40 &&
            this.showLoader("You going to love this...", this.backgroundImage),
          d >= 99
            ? (clearInterval(o), this.setLoaderPercent(99))
            : this.setLoaderPercent(d);
      }, 1e3);
      this.timer = o;
    }
    stopTimer() {
      clearInterval(this.timer), this.setLoaderPercent(0);
    }
    showLoader(a, r = null, e = !1) {
      this.hideSteps();
      const o = this.modalBlock.querySelector(".widget-step-loader"),
        d = o.querySelector("p"),
        g = o.querySelector(".widget-background-image"),
        m = o.querySelector(".widget-loader-percent");
      (d.innerHTML = a ?? "Getting you dressed"),
        e
          ? m.classList.add("widget-hidden")
          : m.classList.remove("widget-hidden"),
        r
          ? (g.style.backgroundImage = `url(${r})`)
          : (g.style.backgroundImage = ""),
        o.classList.add("widget-active");
    }
    resetModalState() {
      if (this.sharedOptionsEnabled && this.sharedOptions.length > 0) {
        if (this.sharedOptions.includes("shareEmail")) {
          const t = this.modalBlock.querySelector("#widget-friends_data_1"),
            i = this.modalBlock.querySelector("#widget-friends_data_2"),
            s = this.modalBlock.querySelector("#widget-your_email");
          (t.value = ""), (i.value = ""), (s.value = "");
        }
        if (this.sharedOptions.includes("shareApps")) {
          const t = this.modalBlock.querySelector("#widget-share-apps");
          t.innerHTML = "";
        }
        const g = this.modalBlock.querySelector(
            ".widget-step-result #widget-discount-code",
          ),
          m = this.modalBlock.querySelector(".widget-step-result #widget-copy");
        (g.innerHTML = ""), m.classList.remove("widget-copied");
      }
      const a = this.modalBlock.querySelector(".widget-step-result img"),
        r = this.modalBlock.querySelector("#widget-result-action-button");
      this.modalBlock
        .querySelector("#widget-errorUpload")
        .classList.add("widget-hidden");
      const o = document.getElementById("widget-uploadInput");
      (o.value = ""),
        (this.modalBlock.querySelectorAll(".widget-error") || []).forEach(
          (g) => {
            g.innerHTML = "";
          },
        ),
        (this.discountCode = ""),
        r.removeAttribute("disabled"),
        (a.src = I);
    }
    hideSteps() {
      this.modalBlock.querySelectorAll(".widget-step").forEach((r) => {
        r.classList.remove("widget-active");
      });
    }
  }
  customElements.define("widget-block", ue);
})();
