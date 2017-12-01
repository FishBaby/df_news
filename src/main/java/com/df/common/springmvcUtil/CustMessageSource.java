package com.df.common.springmvcUtil;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Properties;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.ResourceLoaderAware;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.context.support.AbstractMessageSource;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.util.Assert;
import org.springframework.util.DefaultPropertiesPersister;
import org.springframework.util.PropertiesPersister;
import org.springframework.util.StringUtils;
/**
 * 
 * @author yuminghui3
 *
 */
public class CustMessageSource extends AbstractMessageSource implements ResourceLoaderAware, InitializingBean {

	private static final String PROPERTIES_SUFFIX = ".properties";

	private static final String XML_SUFFIX = ".xml";

	private String[] basenames = null;
	private Locale[] locales = null;
	private String defaultEncoding = "UTF-8";
	private Locale defaultLocal;

	private PropertiesPersister propertiesPersister = new DefaultPropertiesPersister();

	private ResourceLoader resourceLoader = new DefaultResourceLoader();

	private final Map<Locale, PropertiesHolder> cachedMergedProperties = new ConcurrentHashMap<Locale, PropertiesHolder>();

	@Override
	public void afterPropertiesSet() throws Exception {
		boolean defaultExit = false;
		// 预先加载缓存生成到js缓存中
		for (Locale locale : locales) {
			initLoad(locale);
			if (locale.equals(defaultLocal)) {
				defaultExit = true;
			}
		}
		if (false == defaultExit) {
			initLoad(defaultLocal);
		}
	}

	private void initLoad(Locale locale) {
		PropertiesHolder mergedHolder = new PropertiesHolder(new Properties());
		for (int i = this.basenames.length - 1; i >= 0; i--) {
			List<String> filenames = calculateFilenamesForLocale(this.basenames[i], locale);
			for (int j = filenames.size() - 1; j >= 0; j--) {
				String filename = filenames.get(j);
				Properties loadProperties = loadProperties(filename);
				if (loadProperties != null) {
					mergedHolder.getProperties().putAll(loadProperties);
				}
			}
		}
		this.cachedMergedProperties.put(locale, mergedHolder);
	}

	public String getMessage(String code, Object... args) {
		return super.getMessage(code, args, LocaleContextHolder.getLocale());
	}
	public Properties getLocalPro() {
		return getLocalPro(LocaleContextHolder.getLocale()).properties;
	}
	private PropertiesHolder getLocalPro(Locale locale) {
		if (locale == null) {
			locale = defaultLocal;
		}
		PropertiesHolder propHolder = cachedMergedProperties.get(locale);
		if (propHolder == null) {
			propHolder = cachedMergedProperties.get(defaultLocal);
		}
		return propHolder;
	}

	@Override
	protected MessageFormat resolveCode(String code, Locale locale) {
		PropertiesHolder propHolder = getLocalPro(locale);
		MessageFormat result = propHolder.getMessageFormat(code, locale);
		if (result == null) {
			result = propHolder.getErrorMessageFormat();
		}
		return result;
	}

	public void setLocales(String... locales) {
		if (locales != null) {
			this.locales = new Locale[locales.length];
			for (int i = 0; i < locales.length; i++) {
				String[] split = locales[i].split("_");
				if (split.length == 1) {
					this.locales[i] = new Locale(split[0]);
				} else {
					this.locales[i] = new Locale(split[0], split[1]);
				}
			}
		} else {
			this.locales = new Locale[0];
		}
	}

	public void setBasename(String basename) {
		setBasenames(basename);
	}

	public void setBasenames(String... basenames) {
		if (basenames != null) {
			this.basenames = new String[basenames.length];
			for (int i = 0; i < basenames.length; i++) {
				String basename = basenames[i];
				Assert.hasText(basename, "Basename must not be empty");
				this.basenames[i] = basename.trim();
			}
		} else {
			this.basenames = new String[0];
		}
	}

	public void setDefaultEncoding(String defaultEncoding) {
		this.defaultEncoding = defaultEncoding;
	}

	public void setPropertiesPersister(PropertiesPersister propertiesPersister) {
		this.propertiesPersister = (propertiesPersister != null ? propertiesPersister : new DefaultPropertiesPersister());
	}

	public void setResourceLoader(ResourceLoader resourceLoader) {
		this.resourceLoader = (resourceLoader != null ? resourceLoader : new DefaultResourceLoader());
	}

	public void setDefaultLocal(Locale defaultLocal) {
		this.defaultLocal = defaultLocal;
	}

	protected List<String> calculateFilenamesForLocale(String basename, Locale locale) {
		List<String> result = new ArrayList<String>(4);
		String language = locale.getLanguage();
		String country = locale.getCountry();
		String variant = locale.getVariant();
		StringBuilder temp = new StringBuilder(basename);

		temp.append('_');
		if (language.length() > 0) {
			temp.append(language);
			result.add(0, temp.toString());
		}

		temp.append('_');
		if (country.length() > 0) {
			temp.append(country);
			result.add(0, temp.toString());
		}

		if (variant.length() > 0 && (language.length() > 0 || country.length() > 0)) {
			temp.append('_').append(variant);
			result.add(0, temp.toString());
		}
		result.add(basename);
		return result;
	}

	protected Properties loadProperties(String filename) {
		InputStream is = null;
		try {
			Resource resource = this.resourceLoader.getResource(filename + PROPERTIES_SUFFIX);
			if (!resource.exists()) {
				resource = this.resourceLoader.getResource(filename + XML_SUFFIX);
			}
			if (!resource.exists()) {
				return null;
			}
			is = resource.getInputStream();
			Properties props = new Properties();
			if (resource.getFilename().endsWith(XML_SUFFIX)) {
				if (logger.isDebugEnabled()) {
					logger.debug("Loading properties [" + resource.getFilename() + "]");
				}
				this.propertiesPersister.loadFromXml(props, is);
			} else {
				this.propertiesPersister.load(props, new InputStreamReader(is, this.defaultEncoding));
			}
			return props;
		} catch (IOException e) {
			logger.error("Loading properties [" + filename + "]", e);
			return null;
		} finally {
			try {
				if (is != null) {
					is.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	@Override
	public String toString() {
		return getClass().getName() + ": basenames=[" + StringUtils.arrayToCommaDelimitedString(this.basenames) + "]";
	}

	protected class PropertiesHolder {

		private Properties properties;

		/** Cache to hold already generated MessageFormats per message code */
		private final Map<String, Map<Locale, MessageFormat>> cachedMessageFormats = new HashMap<String, Map<Locale, MessageFormat>>();

		public PropertiesHolder(Properties properties) {
			this.properties = properties;
		}

		public PropertiesHolder() {
		}

		public Properties getProperties() {
			return properties;
		}

		public String getProperty(String code) {
			if (this.properties == null) {
				return null;
			}
			return this.properties.getProperty(code);
		}

		public MessageFormat getMessageFormat(String code, Locale locale) {
			if (this.properties == null) {
				return null;
			}
			synchronized (this.cachedMessageFormats) {
				Map<Locale, MessageFormat> localeMap = this.cachedMessageFormats.get(code);
				if (localeMap != null) {
					MessageFormat result = localeMap.get(locale);
					if (result != null) {
						return result;
					}
				}
				String msg = this.properties.getProperty(code);
				if (msg != null) {
					if (localeMap == null) {
						localeMap = new HashMap<Locale, MessageFormat>();
						this.cachedMessageFormats.put(code, localeMap);
					}
					MessageFormat result = createMessageFormat(msg, locale);
					localeMap.put(locale, result);
					return result;
				}
				return null;
			}
		}

		public MessageFormat getErrorMessageFormat() {
			return createMessageFormat("not contain key", defaultLocal);
		}
	}
}