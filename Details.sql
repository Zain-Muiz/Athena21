SELECT COUNT(*) FROM `paidregistration` WHERE `eventName1` LIKE 'APP%' ORDER BY `eventName1` ASC
SELECT COUNT(*) FROM `paidregistration` WHERE `eventName1` LIKE 'Cat%' ORDER BY `eventName1` ASC
SELECT COUNT(*) FROM `paidregistration` WHERE `eventName1` LIKE 'Sta%' ORDER BY `eventName1` ASC
SELECT COUNT(*) FROM `paidregistration` WHERE `eventName1` LIKE 'Ele%' ORDER BY `eventName1` ASC

SELECT COUNT(*) FROM `paidregistration` WHERE `eventName1` LIKE 'Ide%' OR `eventName2` LIKE 'Ide%' OR `eventName3` LIKE 'Ide%'
SELECT COUNT(*) FROM `paidregistration` WHERE `eventName1` LIKE 'On%' OR `eventName2` LIKE 'On%' OR `eventName3` LIKE 'On%'
SELECT COUNT(*) FROM `paidregistration` WHERE `eventName1` LIKE 'cir%' OR `eventName1` LIKE 'cir%' OR `eventName1` LIKE 'cir%'
SELECT COUNT(*) FROM `paidregistration` WHERE `eventName1` LIKE 'cod%' OR `eventName1` LIKE 'cod%' OR `eventName1` LIKE 'cod%'

