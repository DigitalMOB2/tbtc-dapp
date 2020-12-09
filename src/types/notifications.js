/**
 * @typedef {'error'|'info'|'warning'|'success'} TGeneralContext$notificationLevel
 */

/**
 * @typedef {Object} TGeneralContext$notification
 * @property {string} TGeneralContext$notification.id
 * @property {string} TGeneralContext$notification.message
 * @property {TGeneralContext$notificationLevel} TGeneralContext$notification.level
 * @property {number} TGeneralContext$notification.timeout
 */

/**
 * @callback TGeneralContext$addNotification
 * @param {string} message
 * @param {Object} [options]
 * @param {TGeneralContext$notificationLevel} [options.level='error']
 * @param {number} [options.timeout]
 * @param {boolean} [options.override=false]
 * @returns {void}
 */

/**
 * @callback TGeneralContext$removeNotification
 * @param {string} id
 * @returns {void}
 */

/**
 * @callback TGeneralContext$clearNotifications
 * @returns {void}
 */
