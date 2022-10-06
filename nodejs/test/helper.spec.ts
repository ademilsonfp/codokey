
import { CodoPrecision } from '../src/context.js';
import { codoctx, codokey, parseCodokey } from '../src/helper.js';

import tap from 'tap';

tap.test('codokey', function (tap) {
  const context = codoctx({ precision: CodoPrecision.YEAR });

  tap.equal('yj', codokey(1640995200000, context));
  tap.equal('yl', codokey(1577836800000, context));
  tap.equal('yo', codokey(1483228800000, context));
  tap.equal('yr', codokey(1388534400000, context));
  tap.equal('yu', codokey(1293840000000, context));
  tap.equal('yw', codokey(1230768000000, context));
  tap.equal('yz', codokey(1136073600000, context));
  tap.equal('z2', codokey(1041379200000, context));
  tap.equal('z5', codokey(946684800000, context));
  tap.equal('z8', codokey(852076800000, context));
  tap.equal('za', codokey(788918400000, context));
  tap.equal('zd', codokey(694224000000, context));
  tap.equal('zg', codokey(599616000000, context));
  tap.equal('zj', codokey(504921600000, context));
  tap.equal('zm', codokey(410227200000, context));
  tap.equal('zo', codokey(347155200000, context));
  tap.equal('zr', codokey(252460800000, context));
  tap.equal('zu', codokey(157766400000, context));
  tap.equal('zx', codokey(63072000000, context));
  tap.equal('zz', codokey(0, context));

  context.precision = CodoPrecision.MONTH;

  tap.equal('yj0', codokey(1669852800000, context));
  tap.equal('yl9', codokey(1583020800000, context));
  tap.equal('yo6', codokey(1496275200000, context));
  tap.equal('yr4', codokey(1406851200000, context));
  tap.equal('yu1', codokey(1320105600000, context));
  tap.equal('ywb', codokey(1230768000000, context));
  tap.equal('yz8', codokey(1143849600000, context));
  tap.equal('z26', codokey(1054425600000, context));
  tap.equal('z53', codokey(967766400000, context));
  tap.equal('z81', codokey(878342400000, context));
  tap.equal('zaa', codokey(791596800000, context));
  tap.equal('zd8', codokey(702086400000, context));
  tap.equal('zg5', codokey(615254400000, context));
  tap.equal('zj3', codokey(525916800000, context));
  tap.equal('zm0', codokey(439084800000, context));
  tap.equal('zoa', codokey(349833600000, context));
  tap.equal('zr7', codokey(262828800000, context));
  tap.equal('zu5', codokey(173404800000, context));
  tap.equal('zx2', codokey(86745600000, context));
  tap.equal('zzb', codokey(0, context));

  context.precision = CodoPrecision.DAY;

  tap.equal('yj00', codokey(1672444800000, context));
  tap.equal('yl9d', codokey(1584489600000, context));
  tap.equal('yo6r', codokey(1496448000000, context));
  tap.equal('yr4c', codokey(1408406400000, context));
  tap.equal('yu1q', codokey(1320364800000, context));
  tap.equal('ywbc', codokey(1232323200000, context));
  tap.equal('yz8o', codokey(1144281600000, context));
  tap.equal('z267', codokey(1056326400000, context));
  tap.equal('z53n', codokey(968284800000, context));
  tap.equal('z817', codokey(880243200000, context));
  tap.equal('zaak', codokey(792201600000, context));
  tap.equal('zd85', codokey(704160000000, context));
  tap.equal('zg5k', codokey(616118400000, context));
  tap.equal('zj33', codokey(528163200000, context));
  tap.equal('zm0i', codokey(440121600000, context));
  tap.equal('zoa1', codokey(352080000000, context));
  tap.equal('zr7g', codokey(264038400000, context));
  tap.equal('zu50', codokey(175996800000, context));
  tap.equal('zx2g', codokey(87955200000, context));
  tap.equal('zzbu', codokey(0, context));

  context.precision = CodoPrecision.HOUR;

  tap.equal('yj000', codokey(1672527600000, context));
  tap.equal('yl9dk', codokey(1584500400000, context));
  tap.equal('yo6rg', codokey(1496473200000, context));
  tap.equal('yr4cc', codokey(1408446000000, context));
  tap.equal('yu1q7', codokey(1320422400000, context));
  tap.equal('ywbc4', codokey(1232391600000, context));
  tap.equal('yz8o1', codokey(1144360800000, context));
  tap.equal('z267l', codokey(1056333600000, context));
  tap.equal('z53nh', codokey(968306400000, context));
  tap.equal('z817c', codokey(880282800000, context));
  tap.equal('zaak9', codokey(792252000000, context));
  tap.equal('zd856', codokey(704221200000, context));
  tap.equal('zg5k2', codokey(616194000000, context));
  tap.equal('zj33m', codokey(528166800000, context));
  tap.equal('zm0ii', codokey(440139600000, context));
  tap.equal('zoa1f', codokey(352108800000, context));
  tap.equal('zr7gb', codokey(264081600000, context));
  tap.equal('zu507', codokey(176054400000, context));
  tap.equal('zx2g3', codokey(88027200000, context));
  tap.equal('zzbun', codokey(0, context));

  context.precision = CodoPrecision.MINUTE;

  tap.equal('yj00000', codokey(1672531140000, context));
  tap.equal('yl9dk0c', codokey(1584503220000, context));
  tap.equal('yo6rg0p', codokey(1496475240000, context));
  tap.equal('yr4cc11', codokey(1408447320000, context));
  tap.equal('yu1q71e', codokey(1320422940000, context));
  tap.equal('ywbc403', codokey(1232394960000, context));
  tap.equal('yz8o10f', codokey(1144363440000, context));
  tap.equal('z267l0s', codokey(1056335460000, context));
  tap.equal('z53nh15', codokey(968307480000, context));
  tap.equal('z817c1h', codokey(880283160000, context));
  tap.equal('zaak906', codokey(792255180000, context));
  tap.equal('zd8560i', codokey(704223660000, context));
  tap.equal('zg5k20v', codokey(616195680000, context));
  tap.equal('zj33m18', codokey(528167700000, context));
  tap.equal('zm0ii1k', codokey(440139780000, context));
  tap.equal('zoa1f09', codokey(352111800000, context));
  tap.equal('zr7gb0m', codokey(264083820000, context));
  tap.equal('zu5070y', codokey(176055900000, context));
  tap.equal('zx2g31b', codokey(88027920000, context));
  tap.equal('zzbun1n', codokey(0, context));

  context.precision = CodoPrecision.SECOND;

  tap.equal('yj0000000', codokey(1672531199000, context));
  tap.equal('yl9dk0c11', codokey(1584503242000, context));
  tap.equal('yo6rg0p0f', codokey(1496475284000, context));
  tap.equal('yr4cc111h', codokey(1408447326000, context));
  tap.equal('yu1q71e0v', codokey(1320422968000, context));
  tap.equal('ywbc40309', codokey(1232395010000, context));
  tap.equal('yz8o10f1b', codokey(1144363452000, context));
  tap.equal('z267l0s0p', codokey(1056335494000, context));
  tap.equal('z53nh1503', codokey(968307536000, context));
  tap.equal('z817c1h15', codokey(880283178000, context));
  tap.equal('zaak9060i', codokey(792255221000, context));
  tap.equal('zd8560i1k', codokey(704223663000, context));
  tap.equal('zg5k20v0y', codokey(616195705000, context));
  tap.equal('zj33m180c', codokey(528167747000, context));
  tap.equal('zm0ii1k1e', codokey(440139789000, context));
  tap.equal('zoa1f090s', codokey(352111831000, context));
  tap.equal('zr7gb0m06', codokey(264083873000, context));
  tap.equal('zu5070y18', codokey(176055915000, context));
  tap.equal('zx2g31b0m', codokey(88027957000, context));
  tap.equal('zzbun1n1n', codokey(0, context));

  context.precision = CodoPrecision.SPLIT;

  tap.equal('yj00000000', codokey(1672531199900, context));
  tap.equal('yl9dk0c118', codokey(1584503242100, context));
  tap.equal('yo6rg0p0f7', codokey(1496475284200, context));
  tap.equal('yr4cc111h6', codokey(1408447326300, context));
  tap.equal('yu1q71e0v5', codokey(1320422968400, context));
  tap.equal('ywbc403094', codokey(1232395010500, context));
  tap.equal('yz8o10f1b3', codokey(1144363452600, context));
  tap.equal('z267l0s0p2', codokey(1056335494700, context));
  tap.equal('z53nh15031', codokey(968307536800, context));
  tap.equal('z817c1h150', codokey(880283178900, context));
  tap.equal('zaak9060i9', codokey(792255221000, context));
  tap.equal('zd8560i1k8', codokey(704223663100, context));
  tap.equal('zg5k20v0y7', codokey(616195705200, context));
  tap.equal('zj33m180c6', codokey(528167747300, context));
  tap.equal('zm0ii1k1e5', codokey(440139789400, context));
  tap.equal('zoa1f090s4', codokey(352111831500, context));
  tap.equal('zr7gb0m063', codokey(264083873600, context));
  tap.equal('zu5070y182', codokey(176055915700, context));
  tap.equal('zx2g31b0m1', codokey(88027957800, context));
  tap.equal('zzbun1n1n9', codokey(0, context));

  context.untilSplit = 999999;

  tap.equal(
    'yj00000000000',
    codokey({ value: 1672531199, split: 999.999 }, context)
  );

  tap.equal(
    'yl9dk0c11j27v',
    codokey({ value: 1584503242, split: 110.66 }, context)
  );

  tap.equal(
    'yo6rg0p0fgt4r',
    codokey({ value: 1496475284, split: 215.748 }, context)
  );

  tap.equal(
    'yr4cc111hekmw',
    codokey({ value: 1408447326, split: 320.071 }, context)
  );

  tap.equal(
    'yu1q71e0vcbkm',
    codokey({ value: 1320422968, split: 425.129 }, context)
  );

  tap.equal(
    'ywbc40309a2m2',
    codokey({ value: 1232395010, split: 530.053 }, context)
  );

  tap.equal(
    'yz8o10f1b7sx0',
    codokey({ value: 1144363452, split: 635.931 }, context)
  );

  tap.equal(
    'z267l0s0p5jyj',
    codokey({ value: 1056335494, split: 740.852 }, context)
  );

  tap.equal(
    'z53nh15033b6j',
    codokey({ value: 968307536, split: 845.54 }, context)
  );

  tap.equal(
    'z817c1h15120f',
    codokey({ value: 880283178, split: 950.736 }, context)
  );

  tap.equal(
    'zaak9060ik8ng',
    codokey({ value: 792255221, split: 55.667 }, context)
  );

  tap.equal(
    'zd8560i1khzzd',
    codokey({ value: 704223663, split: 160.214 }, context)
  );

  tap.equal(
    'zg5k20v0yfqre',
    codokey({ value: 616195705, split: 265.477 }, context)
  );

  tap.equal(
    'zj33m180cdhy2',
    codokey({ value: 528167747, split: 370.213 }, context)
  );

  tap.equal(
    'zm0ii1k1eb8df',
    codokey({ value: 440139789, split: 475.932 }, context)
  );

  tap.equal(
    'zoa1f090s8zjt',
    codokey({ value: 352111831, split: 580.678 }, context)
  );

  tap.equal(
    'zr7gb0m066qf4',
    codokey({ value: 264083873, split: 685.823 }, context)
  );

  tap.equal(
    'zu5070y184hxk',
    codokey({ value: 176055915, split: 790.135 }, context)
  );

  tap.equal(
    'zx2g31b0m28yl',
    codokey({ value: 88027957, split: 895.074 }, context)
  );

  tap.equal(
    'zzbun1n1nlflr',
    codokey({ value: 0, split: 0 }, context)
  );

  tap.end();
});

tap.test('parseCodokey', function (tap) {
  const context = codoctx({ precision: CodoPrecision.YEAR });

  tap.equal(1640995200000, parseCodokey('yj', context).timestamp.time);
  tap.equal(1577836800000, parseCodokey('yl', context).timestamp.time);
  tap.equal(1483228800000, parseCodokey('yo', context).timestamp.time);
  tap.equal(1388534400000, parseCodokey('yr', context).timestamp.time);
  tap.equal(1293840000000, parseCodokey('yu', context).timestamp.time);
  tap.equal(1230768000000, parseCodokey('yw', context).timestamp.time);
  tap.equal(1136073600000, parseCodokey('yz', context).timestamp.time);
  tap.equal(1041379200000, parseCodokey('z2', context).timestamp.time);
  tap.equal(946684800000, parseCodokey('z5', context).timestamp.time);
  tap.equal(852076800000, parseCodokey('z8', context).timestamp.time);
  tap.equal(788918400000, parseCodokey('za', context).timestamp.time);
  tap.equal(694224000000, parseCodokey('zd', context).timestamp.time);
  tap.equal(599616000000, parseCodokey('zg', context).timestamp.time);
  tap.equal(504921600000, parseCodokey('zj', context).timestamp.time);
  tap.equal(410227200000, parseCodokey('zm', context).timestamp.time);
  tap.equal(347155200000, parseCodokey('zo', context).timestamp.time);
  tap.equal(252460800000, parseCodokey('zr', context).timestamp.time);
  tap.equal(157766400000, parseCodokey('zu', context).timestamp.time);
  tap.equal(63072000000, parseCodokey('zx', context).timestamp.time);
  tap.equal(0, parseCodokey('zz', context).timestamp.time);

  context.precision = CodoPrecision.MONTH;

  tap.equal(1669852800000, parseCodokey('yj0', context).timestamp.time);
  tap.equal(1583020800000, parseCodokey('yl9', context).timestamp.time);
  tap.equal(1496275200000, parseCodokey('yo6', context).timestamp.time);
  tap.equal(1406851200000, parseCodokey('yr4', context).timestamp.time);
  tap.equal(1320105600000, parseCodokey('yu1', context).timestamp.time);
  tap.equal(1230768000000, parseCodokey('ywb', context).timestamp.time);
  tap.equal(1143849600000, parseCodokey('yz8', context).timestamp.time);
  tap.equal(1054425600000, parseCodokey('z26', context).timestamp.time);
  tap.equal(967766400000, parseCodokey('z53', context).timestamp.time);
  tap.equal(878342400000, parseCodokey('z81', context).timestamp.time);
  tap.equal(791596800000, parseCodokey('zaa', context).timestamp.time);
  tap.equal(702086400000, parseCodokey('zd8', context).timestamp.time);
  tap.equal(615254400000, parseCodokey('zg5', context).timestamp.time);
  tap.equal(525916800000, parseCodokey('zj3', context).timestamp.time);
  tap.equal(439084800000, parseCodokey('zm0', context).timestamp.time);
  tap.equal(349833600000, parseCodokey('zoa', context).timestamp.time);
  tap.equal(262828800000, parseCodokey('zr7', context).timestamp.time);
  tap.equal(173404800000, parseCodokey('zu5', context).timestamp.time);
  tap.equal(86745600000, parseCodokey('zx2', context).timestamp.time);
  tap.equal(0, parseCodokey('zzb', context).timestamp.time);

  context.precision = CodoPrecision.DAY;

  tap.equal(1672444800000, parseCodokey('yj00', context).timestamp.time);
  tap.equal(1584489600000, parseCodokey('yl9d', context).timestamp.time);
  tap.equal(1496448000000, parseCodokey('yo6r', context).timestamp.time);
  tap.equal(1408406400000, parseCodokey('yr4c', context).timestamp.time);
  tap.equal(1320364800000, parseCodokey('yu1q', context).timestamp.time);
  tap.equal(1232323200000, parseCodokey('ywbc', context).timestamp.time);
  tap.equal(1144281600000, parseCodokey('yz8o', context).timestamp.time);
  tap.equal(1056326400000, parseCodokey('z267', context).timestamp.time);
  tap.equal(968284800000, parseCodokey('z53n', context).timestamp.time);
  tap.equal(880243200000, parseCodokey('z817', context).timestamp.time);
  tap.equal(792201600000, parseCodokey('zaak', context).timestamp.time);
  tap.equal(704160000000, parseCodokey('zd85', context).timestamp.time);
  tap.equal(616118400000, parseCodokey('zg5k', context).timestamp.time);
  tap.equal(528163200000, parseCodokey('zj33', context).timestamp.time);
  tap.equal(440121600000, parseCodokey('zm0i', context).timestamp.time);
  tap.equal(352080000000, parseCodokey('zoa1', context).timestamp.time);
  tap.equal(264038400000, parseCodokey('zr7g', context).timestamp.time);
  tap.equal(175996800000, parseCodokey('zu50', context).timestamp.time);
  tap.equal(87955200000, parseCodokey('zx2g', context).timestamp.time);
  tap.equal(0, parseCodokey('zzbu', context).timestamp.time);

  context.precision = CodoPrecision.HOUR;

  tap.equal(1672527600000, parseCodokey('yj000', context).timestamp.time);
  tap.equal(1584500400000, parseCodokey('yl9dk', context).timestamp.time);
  tap.equal(1496473200000, parseCodokey('yo6rg', context).timestamp.time);
  tap.equal(1408446000000, parseCodokey('yr4cc', context).timestamp.time);
  tap.equal(1320422400000, parseCodokey('yu1q7', context).timestamp.time);
  tap.equal(1232391600000, parseCodokey('ywbc4', context).timestamp.time);
  tap.equal(1144360800000, parseCodokey('yz8o1', context).timestamp.time);
  tap.equal(1056333600000, parseCodokey('z267l', context).timestamp.time);
  tap.equal(968306400000, parseCodokey('z53nh', context).timestamp.time);
  tap.equal(880282800000, parseCodokey('z817c', context).timestamp.time);
  tap.equal(792252000000, parseCodokey('zaak9', context).timestamp.time);
  tap.equal(704221200000, parseCodokey('zd856', context).timestamp.time);
  tap.equal(616194000000, parseCodokey('zg5k2', context).timestamp.time);
  tap.equal(528166800000, parseCodokey('zj33m', context).timestamp.time);
  tap.equal(440139600000, parseCodokey('zm0ii', context).timestamp.time);
  tap.equal(352108800000, parseCodokey('zoa1f', context).timestamp.time);
  tap.equal(264081600000, parseCodokey('zr7gb', context).timestamp.time);
  tap.equal(176054400000, parseCodokey('zu507', context).timestamp.time);
  tap.equal(88027200000, parseCodokey('zx2g3', context).timestamp.time);
  tap.equal(0, parseCodokey('zzbun', context).timestamp.time);

  context.precision = CodoPrecision.MINUTE;

  tap.equal(1672531140000, parseCodokey('yj00000', context).timestamp.time);
  tap.equal(1584503220000, parseCodokey('yl9dk0c', context).timestamp.time);
  tap.equal(1496475240000, parseCodokey('yo6rg0p', context).timestamp.time);
  tap.equal(1408447320000, parseCodokey('yr4cc11', context).timestamp.time);
  tap.equal(1320422940000, parseCodokey('yu1q71e', context).timestamp.time);
  tap.equal(1232394960000, parseCodokey('ywbc403', context).timestamp.time);
  tap.equal(1144363440000, parseCodokey('yz8o10f', context).timestamp.time);
  tap.equal(1056335460000, parseCodokey('z267l0s', context).timestamp.time);
  tap.equal(968307480000, parseCodokey('z53nh15', context).timestamp.time);
  tap.equal(880283160000, parseCodokey('z817c1h', context).timestamp.time);
  tap.equal(792255180000, parseCodokey('zaak906', context).timestamp.time);
  tap.equal(704223660000, parseCodokey('zd8560i', context).timestamp.time);
  tap.equal(616195680000, parseCodokey('zg5k20v', context).timestamp.time);
  tap.equal(528167700000, parseCodokey('zj33m18', context).timestamp.time);
  tap.equal(440139780000, parseCodokey('zm0ii1k', context).timestamp.time);
  tap.equal(352111800000, parseCodokey('zoa1f09', context).timestamp.time);
  tap.equal(264083820000, parseCodokey('zr7gb0m', context).timestamp.time);
  tap.equal(176055900000, parseCodokey('zu5070y', context).timestamp.time);
  tap.equal(88027920000, parseCodokey('zx2g31b', context).timestamp.time);
  tap.equal(0, parseCodokey('zzbun1n', context).timestamp.time);

  context.precision = CodoPrecision.SECOND;

  tap.equal(1672531199000, parseCodokey('yj0000000', context).timestamp.time);
  tap.equal(1584503242000, parseCodokey('yl9dk0c11', context).timestamp.time);
  tap.equal(1496475284000, parseCodokey('yo6rg0p0f', context).timestamp.time);
  tap.equal(1408447326000, parseCodokey('yr4cc111h', context).timestamp.time);
  tap.equal(1320422968000, parseCodokey('yu1q71e0v', context).timestamp.time);
  tap.equal(1232395010000, parseCodokey('ywbc40309', context).timestamp.time);
  tap.equal(1144363452000, parseCodokey('yz8o10f1b', context).timestamp.time);
  tap.equal(1056335494000, parseCodokey('z267l0s0p', context).timestamp.time);
  tap.equal(968307536000, parseCodokey('z53nh1503', context).timestamp.time);
  tap.equal(880283178000, parseCodokey('z817c1h15', context).timestamp.time);
  tap.equal(792255221000, parseCodokey('zaak9060i', context).timestamp.time);
  tap.equal(704223663000, parseCodokey('zd8560i1k', context).timestamp.time);
  tap.equal(616195705000, parseCodokey('zg5k20v0y', context).timestamp.time);
  tap.equal(528167747000, parseCodokey('zj33m180c', context).timestamp.time);
  tap.equal(440139789000, parseCodokey('zm0ii1k1e', context).timestamp.time);
  tap.equal(352111831000, parseCodokey('zoa1f090s', context).timestamp.time);
  tap.equal(264083873000, parseCodokey('zr7gb0m06', context).timestamp.time);
  tap.equal(176055915000, parseCodokey('zu5070y18', context).timestamp.time);
  tap.equal(88027957000, parseCodokey('zx2g31b0m', context).timestamp.time);
  tap.equal(0, parseCodokey('zzbun1n1n', context).timestamp.time);

  context.precision = CodoPrecision.SPLIT;

  tap.equal(1672531199900, parseCodokey('yj00000000', context).timestamp.time);
  tap.equal(1584503242100, parseCodokey('yl9dk0c118', context).timestamp.time);
  tap.equal(1496475284200, parseCodokey('yo6rg0p0f7', context).timestamp.time);
  tap.equal(1408447326300, parseCodokey('yr4cc111h6', context).timestamp.time);
  tap.equal(1320422968400, parseCodokey('yu1q71e0v5', context).timestamp.time);
  tap.equal(1232395010500, parseCodokey('ywbc403094', context).timestamp.time);
  tap.equal(1144363452600, parseCodokey('yz8o10f1b3', context).timestamp.time);
  tap.equal(1056335494700, parseCodokey('z267l0s0p2', context).timestamp.time);
  tap.equal(968307536800, parseCodokey('z53nh15031', context).timestamp.time);
  tap.equal(880283178900, parseCodokey('z817c1h150', context).timestamp.time);
  tap.equal(792255221000, parseCodokey('zaak9060i9', context).timestamp.time);
  tap.equal(704223663100, parseCodokey('zd8560i1k8', context).timestamp.time);
  tap.equal(616195705200, parseCodokey('zg5k20v0y7', context).timestamp.time);
  tap.equal(528167747300, parseCodokey('zj33m180c6', context).timestamp.time);
  tap.equal(440139789400, parseCodokey('zm0ii1k1e5', context).timestamp.time);
  tap.equal(352111831500, parseCodokey('zoa1f090s4', context).timestamp.time);
  tap.equal(264083873600, parseCodokey('zr7gb0m063', context).timestamp.time);
  tap.equal(176055915700, parseCodokey('zu5070y182', context).timestamp.time);
  tap.equal(88027957800, parseCodokey('zx2g31b0m1', context).timestamp.time);
  tap.equal(0, parseCodokey('zzbun1n1n9', context).timestamp.time);

  context.untilSplit = 999999;

  tap.strictSame(
    { value: 1672531199, split: 999.999 },
    parseCodokey('yj00000000000', context).timestamp.toJSON()
  );

  tap.strictSame(
    { value: 1584503242, split: 110.66 },
    parseCodokey('yl9dk0c11j27v', context).timestamp.toJSON()
  );

  tap.strictSame(
    { value: 1496475284, split: 215.748 },
    parseCodokey('yo6rg0p0fgt4r', context).timestamp.toJSON()
  );

  tap.strictSame(
    { value: 1408447326, split: 320.071 },
    parseCodokey('yr4cc111hekmw', context).timestamp.toJSON()
  );

  tap.strictSame(
    { value: 1320422968, split: 425.129 },
    parseCodokey('yu1q71e0vcbkm', context).timestamp.toJSON()
  );

  tap.strictSame(
    { value: 1232395010, split: 530.053 },
    parseCodokey('ywbc40309a2m2', context).timestamp.toJSON()
  );

  tap.strictSame(
    { value: 1144363452, split: 635.931 },
    parseCodokey('yz8o10f1b7sx0', context).timestamp.toJSON()
  );

  tap.strictSame(
    { value: 1056335494, split: 740.852 },
    parseCodokey('z267l0s0p5jyj', context).timestamp.toJSON()
  );

  tap.strictSame(
    { value: 968307536, split: 845.54 },
    parseCodokey('z53nh15033b6j', context).timestamp.toJSON()
  );

  tap.strictSame(
    { value: 880283178, split: 950.736 },
    parseCodokey('z817c1h15120f', context).timestamp.toJSON()
  );

  tap.strictSame(
    { value: 792255221, split: 55.667 },
    parseCodokey('zaak9060ik8ng', context).timestamp.toJSON()
  );

  tap.strictSame(
    { value: 704223663, split: 160.214 },
    parseCodokey('zd8560i1khzzd', context).timestamp.toJSON()
  );

  tap.strictSame(
    { value: 616195705, split: 265.477 },
    parseCodokey('zg5k20v0yfqre', context).timestamp.toJSON()
  );

  tap.strictSame(
    { value: 528167747, split: 370.213 },
    parseCodokey('zj33m180cdhy2', context).timestamp.toJSON()
  );

  tap.strictSame(
    { value: 440139789, split: 475.932 },
    parseCodokey('zm0ii1k1eb8df', context).timestamp.toJSON()
  );

  tap.strictSame(
    { value: 352111831, split: 580.678 },
    parseCodokey('zoa1f090s8zjt', context).timestamp.toJSON()
  );

  tap.strictSame(
    { value: 264083873, split: 685.823 },
    parseCodokey('zr7gb0m066qf4', context).timestamp.toJSON()
  );

  tap.strictSame(
    { value: 176055915, split: 790.135 },
    parseCodokey('zu5070y184hxk', context).timestamp.toJSON()
  );

  tap.strictSame(
    { value: 88027957, split: 895.074 },
    parseCodokey('zx2g31b0m28yl', context).timestamp.toJSON()
  );

  tap.strictSame(
    { value: 0, split: 0 },
    parseCodokey('zzbun1n1nlflr', context).timestamp.toJSON()
  );

  tap.end();
});
